import * as NavigationMenu from "@radix-ui/react-navigation-menu";

function Navmenu() {
  return (
    <NavigationMenu.Root className="hidden sm:block">
      <NavigationMenu.List className="flex place-content-center">
        <NavigationMenu.Item>
          <MenuTrigger>MEN</MenuTrigger>
          <ContentPane>
            <ListItem>Printed Tshirts</ListItem>
            <ListItem>Oversized Tshirts</ListItem>
            <ListItem>Full Sleeve Tshirts</ListItem>
            <ListItem>Half Sleeve Tshirts</ListItem>
            <ListItem>Polo Tshirts</ListItem>
            <ListItem>Sweatshirts</ListItem>
            <ListItem>Shirts</ListItem>
            <ListItem>Joggers</ListItem>
          </ContentPane>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <MenuTrigger>WOMEN</MenuTrigger>

          <ContentPane>
            <ListItem>Printed Tshirts</ListItem>
            <ListItem>Oversized Tshirts</ListItem>
            <ListItem>Full Sleeve Tshirts</ListItem>
            <ListItem>Half Sleeve Tshirts</ListItem>
            <ListItem>Polo Tshirts</ListItem>
            <ListItem>Sweatshirts</ListItem>
            <ListItem>Shirts</ListItem>
            <ListItem>Joggers</ListItem>
          </ContentPane>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <MenuTrigger>KIDS</MenuTrigger>
          <ContentPane>
            <ListItem>Printed Tshirts</ListItem>
            <ListItem>Full Sleeve Tshirts</ListItem>
            <ListItem>Half Sleeve Tshirts</ListItem>
            <ListItem>Shirts</ListItem>
            <ListItem>Joggers</ListItem>
            <ListItem>Trousers</ListItem>
            <ListItem>Toys</ListItem>
          </ContentPane>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Link className="hover:text-blue-500 px-6 transition-colors">
            MORE
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator className="absolute z-[-1] transition-all data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut">
          <div className="bg-black dark:bg-white h-0.5 w-[calc(100%-1.5rem*2)] m-auto transition-all"></div>
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <NavigationMenu.Viewport className="w-full z-[-2] absolute left-0 bg-white dark:bg-[rgb(15,96,77)] rounded-b-2xl shadow-lg overflow-hidden h-[var(--radix-navigation-menu-viewport-height)] data-[state=open]:animate-getIn data-[state=closed]:animate-getOut" />
    </NavigationMenu.Root>
  );
}

function ContentPane({ children }) {
  return (
    <NavigationMenu.Content className="absolute p-5 w-full data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight">
      <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 w-full">
        {children}
      </ul>
    </NavigationMenu.Content>
  );
}

function ListItem({ className, children, ...props }) {
  return (
    <li className="p-2 text-center">
      <NavigationMenu.Link>
        <a {...props}>
          <div className={` ${className}`}>{children}</div>
        </a>
      </NavigationMenu.Link>
    </li>
  );
}

function MenuTrigger({ children }) {
  return (
    <NavigationMenu.Trigger className="px-6 transition-colors hover:text-emerald-700 dark:hover:text-white">
      {children}
    </NavigationMenu.Trigger>
  );
}

export default Navmenu;
