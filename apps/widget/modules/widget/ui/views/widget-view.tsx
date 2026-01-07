"use client"
import React from 'react'
import WidgetFooter from '../components/widget-footer';
// import WidgetHeader from '../components/widget-header';
import WidgetAuthScreen from '../screens/widget-auth-screen';
import { useAtomValue } from 'jotai';
import { screenAtom } from "@/modules/widget/atoms/widget-atoms";
interface Props{
    organizationId: string;
}

const WidgetView = ({ organizationId }: Props) => { 
    const screen = useAtomValue(screenAtom)
    const screenComponents = {
        error:<p>Error Screen</p>,
        loading:<p>Loading Screen</p>,
        selection:<p>Selection Screen</p>,
        voice:<p>Voice Screen</p>,
        auth:<WidgetAuthScreen/>,
        inbox:<p>Inbox Screen</p>,
        chat:<p>Chat Screen</p>,
        contract:<p>Contract Screen</p>,
    }
    return (
      // TODO: Confirm whether or not "min-h-screen" and "min-w-screen" is needed here
    <main className="flex size-full min-h-screen min-w-screen flex-col overflow-hidden rounded-xl border bg-muted">
    {screenComponents[screen]}

   <WidgetFooter />
    </main>
  )
}

export default WidgetView
