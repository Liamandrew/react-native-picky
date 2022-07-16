//
//  Picky.m
//  Picky
//
//  Created by Liam Andrew on 2/6/2022.
//  Copyright © 2022 Facebook. All rights reserved.
//

#import "Picky.h"

#import <React/RCTConvert.h>
#import <React/RCTUtils.h>

@interface Picky() <UIPickerViewDataSource, UIPickerViewDelegate>
@end

@implementation Picky

- (instancetype)initWithFrame:(CGRect)frame
{
  if ((self = [super initWithFrame:frame])) {
    _color = [UIColor blackColor];
    _font = [UIFont systemFontOfSize:21];
    _textAlign = NSTextAlignmentCenter;
    _numberOfLines = 1;
    _loop = false;
    _loopThreshold = 1;
    _columnWidths = [NSArray new];
    _selectedIndexes = [NSArray new];

    self.delegate = self;
    self.dataSource = self;
  }
  return self;
}

RCT_NOT_IMPLEMENTED(- (instancetype)initWithCoder:(NSCoder *)aDecoder)

- (void)setData:(NSArray *)data
{
  _data = [data copy];
  
  if (_loop) {
    [self initLoopScrollBehaviour];
  }
  
  [self setNeedsLayout];
}

- (void)setColumnWidths:(NSArray *)columnWidths
{
  _columnWidths = [columnWidths copy];

  [self setNeedsLayout];
}

- (void)setSelectedIndexes:(NSArray *)selectedIndexes
{
  BOOL animated = [_selectedIndexes count] > 0; // Don't animate the initial value
  _selectedIndexes = [selectedIndexes copy];

  for (NSInteger i = 0; i < [_data count]; i++) {
    NSInteger currentSelected = [self selectedRowInComponent:i];
    NSInteger checkVal = [[_selectedIndexes objectAtIndex:i] integerValue];

    if (i < _selectedIndexes.count && currentSelected != checkVal ) {

      if (_loop) {
        checkVal = (_loopThreshold / 2) * [[self dataForComponent:i] count] + checkVal;
      }

      dispatch_async(dispatch_get_main_queue(), ^{
        [self selectRow:checkVal inComponent:i animated:animated];
      });
    }
  }
}

- (void)setLoop: (BOOL)loop
{
  _loop = loop;
  
  if (loop) {
    _loopThreshold = 60;
    
    [self initLoopScrollBehaviour];
  } else {
    _loopThreshold = 1;
  }
  
  [self setNeedsLayout];
}

- (void)setNumberOfLines:(NSInteger)numberOfLines
{
  _numberOfLines = numberOfLines;
  [self reloadAllComponents];
  [self setNeedsLayout];
}

- (void)setFont:(UIFont *)font
{
  _font = font;
  [self reloadAllComponents];
  [self setNeedsLayout];
}

#pragma mark - Helpers
- (NSArray *)dataForComponent:(NSInteger)component
{
  return [_data objectAtIndex:component];
}

- (NSDictionary *)dataForRow:(NSInteger)row inComponent:(NSInteger)component
{
  NSArray *data = [self dataForComponent:component];
  
  return [data objectAtIndex: row % [data count]];
}

- (void)initLoopScrollBehaviour
{
  // Set selected in the middle for each column
  for (NSInteger i = 0; i < [_data count]; i++) {
    [self selectRow:(_loopThreshold / 2) * [[self dataForComponent:i] count] inComponent:i animated:FALSE];
  }
}

#pragma mark - UIPickerViewDataSource protocol

- (NSInteger)numberOfComponentsInPickerView:(__unused UIPickerView *)pickerView
{
  return [_data count];
}

- (NSInteger)pickerView:(__unused UIPickerView *)pickerView
numberOfRowsInComponent:(__unused NSInteger)component
{
  return [[_data objectAtIndex:component] count] * _loopThreshold;
}

#pragma mark - UIPickerViewDelegate methods

- (NSString *)pickerView:(__unused UIPickerView *)pickerView
             titleForRow:(NSInteger)row
            forComponent:(__unused NSInteger)component
{
  return [RCTConvert NSString: [self dataForRow:row inComponent:component][@"label"]];
}

- (CGFloat)pickerView:(__unused UIPickerView *)pickerView
rowHeightForComponent:(__unused NSInteger) component {
  return (_font.lineHeight) * _numberOfLines + 20;
}

- (CGFloat)pickerView:(__unused UIPickerView *)pickerView
    widthForComponent:(__unused NSInteger)component {
  if ([_columnWidths count] == 0) {
    return 0;
  }

  return [[_columnWidths objectAtIndex:component] floatValue];
}

- (UIView *)pickerView:(UIPickerView *)pickerView
            viewForRow:(NSInteger)row
          forComponent:(NSInteger)component
           reusingView:(UIView *)view
{
  if (!view) {
    CGFloat rowHeight = [pickerView rowSizeForComponent:component].height;
    CGFloat rowWidth = [pickerView rowSizeForComponent:component].width;
    view = [[UIView alloc] initWithFrame:CGRectZero];
    PickyLabel* label = [[PickyLabel alloc] initWithFrame:(CGRect) {
      CGPointZero,
      {
        rowWidth,
        rowHeight,
      }
    }];
    [view insertSubview:label atIndex:0];
  }
  
  PickyLabel* label = view.subviews[0];
  label.font = _font;
  
  NSDictionary *rowData = [self dataForRow:row inComponent:component];
  
  label.textColor = [RCTConvert UIColor:rowData[@"textColor"]] ?: _color;
  
  label.textAlignment = _textAlign;
  label.text = [self pickerView:pickerView titleForRow:row forComponent:component];
  label.accessibilityIdentifier = rowData[@"testID"];
  
  label.numberOfLines = _numberOfLines;
  
  label.leftInset = 20.0;
  label.rightInset = 20.0;
  
  return view;
}

- (void)pickerView:(__unused UIPickerView *)pickerView
      didSelectRow:(NSInteger)row
       inComponent:(NSInteger)component
{
  NSInteger dataCount = [[self dataForComponent:component] count];
  NSInteger newRow = row % dataCount;

  NSMutableArray *newSelectedIndexes = [_selectedIndexes mutableCopy];
  newSelectedIndexes[component] = [NSNumber numberWithInteger:newRow];
  _selectedIndexes = newSelectedIndexes;

  if (_onChange && dataCount > (NSUInteger)newRow) {
    _onChange(@{
      @"column": @(component),
      @"index": @(newRow),
      @"value": RCTNullIfNil([self dataForRow:row inComponent:component][@"value"]),
    });
  }
  
  if (_loop) {
    [self selectRow:(_loopThreshold / 2) * dataCount + newRow inComponent:component animated:FALSE];
  }
}

@end
