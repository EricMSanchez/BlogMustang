
import { Component, HostBinding } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes, animateChild,query,group } from '@angular/animations';


export const slideInAnimation = (
[
  trigger('slideInOut', [
    transition('* => *, :enter', [
      query(':enter, :leave', style({ position: 'absolute', width: '100%' }), { optional: true }),
      query(':enter', style({ transform: 'translateX(-100vw)' }), { optional: true }),
      query(':leave', style({ transform: 'translateX(0vw)' }), { optional: true }),

      group([
        query(':leave', [
          animate('600ms ease-in-out', style({
            transform: 'translateX(100vw)'
          }))
        ], { optional: true }),
        query(':enter', [
          animate('600ms ease-in-out', style({
            transform: 'translateX(0)'
          }))
        ], { optional: true })
      ])
    ])
  ])
] );