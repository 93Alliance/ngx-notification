import { trigger, style, animate, transition } from '@angular/animations';

export const r2l = trigger(
    'r2l',
    [
        transition(':enter', [
            style({transform: 'translateX(100%)', opacity: 0}),
            animate('350ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
            style({transform: 'translateX(0)', opacity: 1}),
            animate('350ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
    ]
  );

export const l2r = trigger(
    'l2r',
    [
        transition(':enter', [
            style({transform: 'translateX(-100%)', opacity: 0}),
            animate('350ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
            style({transform: 'translateX(0)', opacity: 1}),
            animate('350ms', style({transform: 'translateX(-100%)', opacity: 0}))
        ])
    ]
);
