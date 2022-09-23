import React from 'react';
import { ControllerStateAndHelpers, DownshiftProps } from 'downshift';
export type BaseItem = {
  value: string;
};

export type DropdownProps<Item extends BaseItem = BaseItem> =
  DownshiftProps<Item>;

export type DropdownContextType<Item extends BaseItem> =
  ControllerStateAndHelpers<Item>;

export const DropdownContext = React.createContext<
  DropdownContextType<BaseItem> | undefined
>(undefined);

export function useDropDownContext<Item extends BaseItem>() {
  const context = React.useContext(DropdownContext);
  if (!context) {
    throw new Error(
      `useDropDownContext cannot be used outside the DropdownContext`
    );
  }
  return context as DropdownContextType<Item>;
}
