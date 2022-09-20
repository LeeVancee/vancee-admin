import { defineStore } from 'pinia'
import { deepCopy } from '@/utils/util'
import { TabPaneProps } from 'element-plus'
import { TabsState } from '../interface'
import piniaPersist from '@/config/piniaPersist'
import { HOME_URL, TABS_WHITE_LIST } from '@/config/config'
import router from '@/router/index'

export const TabsStore = defineStore({
  id: 'TabsState',
  state: (): TabsState => ({
    tabsMenuValue: HOME_URL,
    tabsMenuList: [{ title: '首页', path: HOME_URL, icon: 'home-filled', close: false }]
  }),
  getters: {},
  actions: {
    // Add Tabs
    async addTabs(tabItem: Menu.MenuOptions) {
      // not add tabs whiteList
      if (TABS_WHITE_LIST.includes(tabItem.path)) return
      const tabInfo: Menu.MenuOptions = {
        title: tabItem.title,
        path: tabItem.path,
        close: tabItem.close
      }
      let flag = false
      this.tabsMenuList.forEach((item) => {
        if (item.title === tabItem.title) flag = true
      })
      if (flag) {
        router.push(tabItem.path)
        this.setTabsMenuValue(tabItem.path)
      } else {
        const newTabsMenuList = deepCopy<Menu.MenuOptions[]>(this.tabsMenuList)
        newTabsMenuList.push(tabInfo)
        this.tabsMenuList = newTabsMenuList
        this.tabsMenuValue = tabItem.path
        router.push(tabItem.path)
      }
      flag = false
    },
    // Remove Tabs
    async removeTabs(tabPath: string) {
      let tabsMenuValue = this.tabsMenuValue
      const tabsMenuList = this.tabsMenuList
      if (tabsMenuValue === tabPath) {
        tabsMenuList.forEach((item, index) => {
          if (item.path === tabPath) {
            const nextTab = tabsMenuList[index + 1] || tabsMenuList[index - 1]
            if (nextTab) {
              tabsMenuValue = nextTab.path
              router.push(nextTab.path)
            }
          }
        })
      }
      this.tabsMenuValue = tabsMenuValue
      this.tabsMenuList = tabsMenuList.filter((item) => item.path !== tabPath)
    },
    // Change Tabs
    async changeTabs(tabItem: TabPaneProps) {
      this.tabsMenuList.forEach((item) => {
        if (item.title === tabItem.label) router.push(item.path)
      })
    },
    // Set TabsMenuValue
    async setTabsMenuValue(tabsMenuValue: string) {
      this.tabsMenuValue = tabsMenuValue
    },
    // Set TabsMenuList
    async setTabsMenuList(tabsMenuList: Menu.MenuOptions[]) {
      this.tabsMenuList = tabsMenuList
    },
    // Close MultipleTab
    async closeMultipleTab(tabsMenuValue?: string) {
      this.tabsMenuList = this.tabsMenuList.filter((item) => {
        return item.path === tabsMenuValue || item.path === HOME_URL
      })
    },
    // Go Home
    async goHome() {
      router.push(HOME_URL)
      this.tabsMenuValue = HOME_URL
    }
  },
  persist: piniaPersist('TabsState')
})
