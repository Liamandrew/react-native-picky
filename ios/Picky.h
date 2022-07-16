//
//  Picky.h
//  Picky
//
//  Created by Liam Andrew on 2/6/2022.
//  Copyright © 2022 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

#import <React/UIView+React.h>

#import "PickyLabel.h"

@interface Picky : UIPickerView

@property (nonatomic, copy) NSArray *data;
@property (nonatomic, copy) NSArray *columnWidths;
@property (nonatomic, copy) NSArray *selectedIndexes;

@property (nonatomic, assign) BOOL loop;
@property (nonatomic, assign) int loopThreshold;

@property (nonatomic, strong) UIColor *color;
@property (nonatomic, strong) UIFont *font;
@property (nonatomic, assign) NSTextAlignment textAlign;

@property (nonatomic, assign) NSInteger numberOfLines;

@property (nonatomic, copy) RCTBubblingEventBlock onChange;

@end
