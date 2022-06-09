//
//  PickyLabel.m
//  Picky
//
//  Created by Liam Andrew on 2/6/2022.
//  Copyright © 2022 Facebook. All rights reserved.
//

#import "PickyLabel.h"

@implementation PickyLabel

- (instancetype)initWithFrame:(CGRect)frame
{
  self = [super initWithFrame:frame];
  if (self) {
    self.topInset = 0.0;
    self.bottomInset = 0.0;
    self.leftInset = 0.0;
    self.rightInset = 0.0;
  }
  return self;
}

- (void)drawTextInRect:(CGRect)rect
{
  UIEdgeInsets insets = UIEdgeInsetsMake(self.topInset, self.leftInset, self.bottomInset, self.rightInset);
  [super drawTextInRect:UIEdgeInsetsInsetRect(rect, insets)];
}

- (CGSize)intrinsicContentSize
{
  CGSize intrinsicSuperViewContentSize = [super intrinsicContentSize];
  intrinsicSuperViewContentSize.height += self.topInset + self.bottomInset;
  intrinsicSuperViewContentSize.width += self.leftInset + self.rightInset;
  return intrinsicSuperViewContentSize;
}

@end
