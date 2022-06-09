//
//  PickyLabel.h
//  Picky
//
//  Created by Liam Andrew on 2/6/2022.
//  Copyright © 2022 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface PickyLabel : UILabel

@property (nonatomic, assign) CGFloat topInset;
@property (nonatomic, assign) CGFloat bottomInset;
@property (nonatomic, assign) CGFloat leftInset;
@property (nonatomic, assign) CGFloat rightInset;

@end
