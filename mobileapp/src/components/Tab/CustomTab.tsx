import { TabItemProps, TabProps, TabView, TabViewItemProps } from "@rneui/base"
import { Tab } from "@rneui/themed"
import React from "react"
import { ScrollView } from "react-native"

const CustomTabItem: React.FC<TabItemProps> = (props) => (
    <Tab.Item
        {...props}
        titleStyle={{ fontSize: 12, color: "black" }}
        containerStyle={{ backgroundColor: "white" }}
    />
)

const CustomTab: React.FC<TabProps> = (props) => (
    <Tab
        {...props}
        indicatorStyle={{
            backgroundColor: 'black',
            height: 3,
        }}
    />
)

const CustomTabViewItem: React.FC<TabViewItemProps> = (props) => (
    <TabView.Item
        {...props}
        style={{ width: '100%', height: "100%" }}
    >
        <ScrollView>
            {props.children}
        </ScrollView>
    </TabView.Item>

)

export { CustomTabItem, CustomTab, CustomTabViewItem }