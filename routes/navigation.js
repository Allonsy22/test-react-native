import React from 'react';
import { DrawerActions } from '@react-navigation/native';
import { DrawerContent } from '@react-navigation/drawer';
export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
};

export function goBack() {
  navigationRef.current?.goBack();
};

export function toggleDrawer() {
  navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
};

export function openDrawer() {
    navigationRef.current?.dispatch(DrawerActions.openDrawer());
};

export function getCurrentRoute() {
  navigationRef.current?.getCurrentRoute();
};