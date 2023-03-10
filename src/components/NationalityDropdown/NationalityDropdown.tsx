import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export interface NationalityDropdownProps {
  nationalities: string[];
  currentFilter: string;
  onNationalitySelected: (nationality: string) => void;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const NationalityDropdown: React.FC<NationalityDropdownProps> = (
  props: NationalityDropdownProps
) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-sky-600 shadow-md hover:bg-gray-50 focus:outline-none ">
          {props.currentFilter}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {props.nationalities?.map((nationality) => {
              return (
                <Menu.Item key={nationality}>
                  {({ active }) => (
                    <a
                      onClick={() => props.onNationalitySelected(nationality)}
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      {nationality}
                    </a>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default NationalityDropdown;
