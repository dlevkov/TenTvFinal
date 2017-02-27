import { trigger, state, style, transition, animate } from '@angular/core';

export const pageTransition =
    trigger('transition', [

        state('in', style({
            transform: 'translateY(0)',
            opacity: '0'
        })),

        transition('void => *', [
            style({ transform: 'translateY(-15px)', opacity: '1' }),
            animate(1000)
        ])
    ]);
export const visibilityChanged = trigger('visibilityChanged', [
    state('shown', style({
        opacity: 1,
        transform: 'translateY(0)'
    })),
    state('hidden', style({
        opacity: 0,
        transform: 'translateY(-100%)'
    })),
    transition('shown => hidden', animate('400ms')),
    transition('hidden => shown', animate('300ms'))
]);
export const confirmationAnimation = trigger(
    'confirmationAnimation', [
        transition(':enter', [
            style({ transform: 'translateY(-100%)', opacity: 0.5 }),
            animate('500ms', style({ transform: 'translateY(0)', opacity: 1 }))
        ])
    ]
);
