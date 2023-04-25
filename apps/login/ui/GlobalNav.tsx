"use client";

import { demos, type Item } from "#/lib/demos";
import { ZitadelLogo } from "#/ui/ZitadelLogo";
import Link from "next/link";
import { useSelectedLayoutSegment, usePathname } from "next/navigation";
import clsx from "clsx";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export function GlobalNav() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <div className="fixed top-0 z-10 flex w-full flex-col border-b border-divider-light dark:border-divider-dark bg-background-light-700 dark:bg-background-dark-700 lg:bottom-0 lg:z-auto lg:w-72 lg:border-r">
      <div className="flex h-14 items-center py-4 px-4 lg:h-auto">
        <Link
          href="/"
          className="group flex w-full items-center space-x-2.5"
          onClick={close}
        >
          <div className="">
            <ZitadelLogo />
          </div>

          <h2 className="text-blue-500 font-bold uppercase transform translate-y-2 text-sm">
            Login
          </h2>
        </Link>
      </div>
      <button
        type="button"
        className="group absolute right-0 top-0 flex h-14 items-center space-x-2 px-4 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="font-medium text-gray-100 group-hover:text-gray-400">
          Menu
        </div>
        {isOpen ? (
          <XMarkIcon className="block w-6 text-gray-300" />
        ) : (
          <Bars3Icon className="block w-6 text-gray-300" />
        )}
      </button>

      <div
        className={clsx("overflow-y-auto lg:static lg:block", {
          "fixed inset-x-0 bottom-0 top-14 mt-px bg-white dark:bg-black":
            isOpen,
          hidden: !isOpen,
        })}
      >
        <nav className="space-y-6 px-4 py-5">
          {demos.map((section) => {
            return (
              <div key={section.name}>
                <div className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-text-light-secondary-500 dark:text-text-dark-secondary-500">
                  <div>{section.name}</div>
                </div>

                <div className="space-y-1">
                  {section.items.map((item) => (
                    <GlobalNavItem key={item.slug} item={item} close={close} />
                  ))}
                </div>
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

function GlobalNavItem({
  item,
  close,
}: {
  item: Item;
  close: () => false | void;
}) {
  const segment = useSelectedLayoutSegment();
  const pathname = usePathname();

  const isActive = `/${item.slug}` === pathname;

  return (
    <Link
      onClick={close}
      href={`/${item.slug}`}
      className={clsx(
        "block rounded-md px-3 py-2 text-[15px] font-medium hover:text-black dark:hover:text-gray-300",
        {
          "text-text-light-secondary-500 dark:text-text-dark-secondary-500 hover:text-text-light-500 hover:dark:text-text-dark-500":
            !isActive,
          "text-text-light-500 dark:text-text-dark-500 font-semibold": isActive,
        }
      )}
    >
      {item.name}
    </Link>
  );
}
