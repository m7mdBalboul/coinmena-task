import React from 'react';
import Downshift from 'downshift';
import {
  Box,
  CSS,
  Flex,
  styled,
  css as themeCss,
  Input as BaseInput,
  Button as BaseButton,
} from '@crypto/design-system';
import {
  BaseItem,
  DropdownProps,
  DropdownContext,
  useDropDownContext,
  DropdownContextType,
} from './dropdownContext';

const DropdownContainer = styled(Box, {
  position: 'relative',
});

const StyledList = styled('ul', Flex, {
  padding: 0,
  marginBlock: 0,
  defaultVariants: {
    direction: 'column',
  },
});

const StyledBody = styled('section', Flex, {
  p: 0,
  mt: '$1',
  zIndex: '$2',
  boxShadow: '$md',
  maxHeight: '$60',
  overflowY: 'scroll',
  background: 'White',
  position: 'absolute',
  width: 'min(100px, 200px)',
  defaultVariants: {
    direction: 'column',
  },
});

const StyledLi = styled('li', Flex, {
  py: '$2',
  px: '$3',
  boxShadow: '$sm',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
});

const StyledHandle = styled(Flex, {
  boxShadow: 'sm',
  backgroundColor: 'white',
  gap: '$0.5',
});

const StyledLabel = styled('label', {});

function Dropdown<Item extends BaseItem = BaseItem>({
  children,
  onChange,
  css,
  ...rest
}: React.PropsWithChildren<Omit<DropdownProps<Item>, 'children'>> & {
  css?: CSS;
}) {
  return (
    <Downshift<Item>
      onChange={onChange}
      itemToString={(item) => (item ? item.value : '')}
      {...rest}
    >
      {(contextProps) => (
        <DropdownContainer css={css} {...contextProps.getRootProps()}>
          <DropdownContext.Provider
            value={contextProps as DropdownContextType<Item & any>}
          >
            {children}
          </DropdownContext.Provider>
        </DropdownContainer>
      )}
    </Downshift>
  );
}

const Body = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof StyledBody>
>(({ css, children, ...rest }, forwardedRef) => {
  const { isOpen } = useDropDownContext();

  return isOpen ? (
    <StyledBody ref={forwardedRef} css={css as CSS} {...rest}>
      {children}
    </StyledBody>
  ) : null;
});

type HandleProps<Item extends BaseItem = BaseItem> = Omit<
  React.ComponentProps<typeof StyledHandle>,
  'children'
> & {
  children:
    | (({
        isOpen,
        selectedItem,
      }: {
        isOpen: boolean;
        selectedItem: DropdownContextType<Item>['selectedItem'];
      }) => React.ReactNode)
    | React.PropsWithChildren['children'];
};

const _Handle = <Item extends BaseItem = BaseItem>(
  { css, children, ...rest }: HandleProps<Item>,
  forwardedRef:
    | ((instance: HTMLDivElement | null) => void)
    | React.RefObject<HTMLDivElement>
    | null
    | undefined
) => {
  const { selectedItem, isOpen } = useDropDownContext();
  return (
    <StyledHandle ref={forwardedRef} {...rest} css={css as CSS}>
      {children instanceof Function
        ? children({
            isOpen,
            selectedItem:
              selectedItem as DropdownContextType<Item>['selectedItem'],
          })
        : children}
    </StyledHandle>
  );
};

const Handle = React.forwardRef(_Handle as any) as <
  Item extends BaseItem = BaseItem
>(
  p: HandleProps<Item> & { ref?: HTMLDivElement }
) => React.ReactElement;

const Label = React.forwardRef<
  HTMLLabelElement,
  React.ComponentProps<typeof StyledLabel>
>(({ css, children, ...rest }, forwardedRef) => {
  const { getLabelProps } = useDropDownContext();
  return (
    <StyledLabel
      {...getLabelProps({ ...rest, ref: forwardedRef })}
      css={css as CSS}
    >
      {children}
    </StyledLabel>
  );
});

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof BaseInput>
>(({ css, ...rest }, forwardedRef) => {
  const { getInputProps } = useDropDownContext();
  return (
    <BaseInput
      {...getInputProps({ ...rest, ref: forwardedRef })}
      css={{ flexShrink: 0, ...(css as CSS) }}
    />
  );
});

const ToggleButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof BaseButton>
>(({ css, children, onClick, ...rest }, forwardedRef) => {
  const { getToggleButtonProps, setState } = useDropDownContext();
  return (
    <BaseButton
      {...getToggleButtonProps({
        ref: forwardedRef,
        'aria-label': 'toggle Menu',
        onClick: () => {
          onClick ?? setState((state) => ({ ...state, inputValue: '' }));
        },
      })}
      {...rest}
      css={css as CSS}
    >
      {children}
    </BaseButton>
  );
});

const List = React.forwardRef<
  HTMLUListElement,
  Omit<React.ComponentProps<typeof StyledList>, 'children' | 'wrap'> & {
    children:
      | React.PropsWithChildren['children']
      | (({
          inputValue,
        }: {
          inputValue: DropdownContextType<BaseItem>['inputValue'];
        }) => React.ReactNode);
  }
>(({ children, ...rest }, forwardedRef) => {
  const { getMenuProps, inputValue } = useDropDownContext();

  return (
    <StyledList {...getMenuProps({ ref: forwardedRef, ...rest })}>
      {children instanceof Function ? children({ inputValue }) : children}
    </StyledList>
  );
});

export type MenuItemProps<Item extends BaseItem = BaseItem> = Omit<
  React.ComponentPropsWithoutRef<typeof StyledLi>,
  'wrap'
> & {
  index: number;
  item: Item;
  highlightedClass?: CSS;
  selectedClass?: CSS;
};

const _MenuItem = <Item extends BaseItem = BaseItem>(
  {
    item,
    index,
    children,
    className,
    selectedClass = { backgroundColor: '$gray300' },
    highlightedClass = { backgroundColor: '$gray300' },
    ...rest
  }: MenuItemProps<Item>,
  forwardedRef: React.ForwardedRef<HTMLLIElement>
) => {
  const { getItemProps, highlightedIndex, selectedItem } = useDropDownContext();
  const classNames = `${
    highlightedIndex === index && highlightedClass
      ? themeCss(highlightedClass)
      : ''
  } ${
    selectedItem?.value === item.value && selectedClass
      ? themeCss(selectedClass)
      : ''
  } ${className}`;

  return (
    <StyledLi
      {...getItemProps({
        ref: forwardedRef,
        item,
        index,
        className: classNames,
        ...rest,
      })}
    >
      {children}
    </StyledLi>
  );
};

const MenuItem = React.forwardRef(_MenuItem) as <
  Item extends BaseItem = BaseItem
>(
  p: MenuItemProps<Item> & { ref?: React.ForwardedRef<HTMLLIElement> }
) => React.ReactElement;

Dropdown.Body = Body;
Dropdown.Input = Input;
Dropdown.ToggleButton = ToggleButton;
Dropdown.List = List;
Dropdown.MenuItem = MenuItem;
Dropdown.Handle = Handle;
Dropdown.Label = Label;

export { Dropdown };
