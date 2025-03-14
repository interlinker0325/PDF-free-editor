"use client"

// React
import React from 'react'

// Router

// Shadcn IU
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Button} from "@/components/ui/button"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar"

// Styles
import styles from './styles'

export default (props) => {
  return (
      <React.Fragment>
        <div className={styles.contAvatar}>
          <ButtonsList {...props}/>
          <NavMenuLogin {...props} />
        </div>
      </React.Fragment>
  )
}

/**
 * Only Show when not logged
 *
 * Button List
 */
const ButtonsList = ({items, handleClick}) => {
  return (
      <section className={styles.contBtnOptions}>
        {
          items.map((item, index) => {
            if (item?.isAction && !item?.isMobile) {
              return (
                  <Button key={index} onClick={() => handleClick(item)} className={styles.contBtn} variant="link">
                    {item.name}
                  </Button>
              )
            }
          })
        }
      </section>
  )
}

/**
 *  Only Show when is logged
 *
 * Menu Nav
 */
const NavMenuLogin = ({user, items, handleClick}) => {
  const pathCurrent = typeof window !== "undefined" ? window.location.pathname : null;
  console.log(pathCurrent, "pathCurrent")
  if (user?.isLoggedIn === false) return null
  return (
      <Menubar className="[all:unset] bg-transparent">
        <MenubarMenu className="menu-profile">
          <MenubarTrigger className={`menu-profile ${styles.contProfile}`}>
            <Avatar className="cursor-pointer">
              <AvatarImage src={user?.avatar?.url}/>
              <AvatarFallback>{user?.fullname?.slice(0, 1)?.toUpperCase()}</AvatarFallback>
            </Avatar>
          </MenubarTrigger>
          <MenubarContent>
            {
              items.map((item, index) => {
                if (item?.isAction || item?.action === pathCurrent) return null
                return (
                    <React.Fragment key={index}>
                      {(index === items?.length - 1) && <MenubarSeparator/>}
                      <MenubarItem onClick={() => handleClick(item)}>
                        {item.name}
                      </MenubarItem>
                    </React.Fragment>
                )
              })
            }
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
  )
}