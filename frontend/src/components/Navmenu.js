import * as NavigationMenu from "@radix-ui/react-navigation-menu";

function Navmenu() {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List className="flex space-x-4">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="hover:text-blue-500">
            MEN
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="p-4 bg-gray-100">
            gfg
            <NavigationMenu.Link />
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="hover:text-blue-500">
            WOMEN
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="p-4 bg-gray-100">
            <NavigationMenu.Sub>
              <NavigationMenu.List className="flex space-x-4" />
              <NavigationMenu.Viewport />
            </NavigationMenu.Sub>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Link className="hover:text-blue-500">
            KIDS
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator className="bg-blue-500 h-1" />
      </NavigationMenu.List>

      <NavigationMenu.Viewport />
    </NavigationMenu.Root>
  );
}

function ListItem({ className, children, title, ...props }) {
  return;
  <li>
    <NavigationMenu.Link asChild></NavigationMenu.Link>
  </li>;
}

export default Navmenu;
