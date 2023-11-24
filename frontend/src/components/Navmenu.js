import * as NavigationMenu from "@radix-ui/react-navigation-menu";

function Navmenu() {
  return (
    <NavigationMenu.Root className="hidden sm:block">
      <NavigationMenu.List className="flex place-content-center">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="hover:text-yellow-900 px-6 transition-colors">
            MEN
          </NavigationMenu.Trigger>
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
          <NavigationMenu.Trigger className="hover:text-yellow-900 px-6 transition-colors">
            WOMEN
          </NavigationMenu.Trigger>

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
          <NavigationMenu.Trigger className="hover:text-yellow-900 px-6 transition-colors">
            KIDS
          </NavigationMenu.Trigger>
          <ContentPane></ContentPane>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Link className="hover:text-blue-500 px-6 transition-colors">
            MORE
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator className="absolute z-[-1] transition-all data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut">
          <div className="bg-black h-0.5 w-[calc(100%-1.5rem*2)] m-auto transition-all"></div>
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <NavigationMenu.Viewport className="w-full z-[-2] absolute left-0 h-14 data-[state=open]:animate-getIn data-[state=closed]:animate-getOut " />
    </NavigationMenu.Root>
  );
}

function ContentPane({ children }) {
  return (
    <NavigationMenu.Content className="absolute p-5 w-full bg-white dark:bg-gray-700 rounded-b-2xl shadow-lg data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight">
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

export default Navmenu;
