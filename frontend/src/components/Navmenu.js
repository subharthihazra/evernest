import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import menuData from "../data/menu";

function Navmenu() {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List className="flex place-content-center">
        {menuData.map((option) => (
          <NavigationMenu.Item key={option.trigger}>
            <MenuTrigger>{option.trigger}</MenuTrigger>
            <ContentPane>
              {option?.content.map((subOption) => (
                <ListItem key={subOption}>{subOption}</ListItem>
              ))}
            </ContentPane>
          </NavigationMenu.Item>
        ))}

        <NavigationMenu.Indicator className="absolute z-[2] transition-all data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut">
          <div className="bg-black dark:bg-white h-0.5 w-[calc(100%-1.5rem*2)] m-auto transition-all"></div>
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <NavigationMenu.Viewport className="relative w-full z-[1] left-0 overflow-hidden h-[var(--radix-navigation-menu-viewport-height)] data-[state=open]:animate-getIn data-[state=closed]:animate-getOut" />
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
