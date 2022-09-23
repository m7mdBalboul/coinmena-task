import { Dropdown, MenuItemProps } from '@crypto/ui';

const StyledMenuItem = ({ children, ...rest }: MenuItemProps) => {
  return (
    <Dropdown.MenuItem
      highlightedClass={{ color: '$blue400' }}
      align='center'
      {...rest}
    >
      {children}
    </Dropdown.MenuItem>
  );
};

function ActionDropdown() {
  return (
    <Dropdown
      selectedItem={null}
      onChange={(item) => {
        alert(item?.value);
      }}
    >
      <Dropdown.Handle>
        <Dropdown.ToggleButton>
          Action
        </Dropdown.ToggleButton>
      </Dropdown.Handle>
      <Dropdown.Body css={{ overflow: 'auto' }}>
        <Dropdown.List>
          <StyledMenuItem index={0} item={{ value: 'Buy' }}>
            Buy
          </StyledMenuItem>
          <StyledMenuItem index={1} item={{ value: 'Sell' }}>
            Sell
          </StyledMenuItem>
        </Dropdown.List>
      </Dropdown.Body>
    </Dropdown>
  );
}

export { ActionDropdown };
