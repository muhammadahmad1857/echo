"use client"
import React from 'react'
// import WidgetFooter from '../components/widget-footer';
// import WidgetHeader from '../components/widget-header';
import WidgetAuthScreen from '../screens/widget-auth-screen';

interface Props{
    organizationId: string;
}

const WidgetView = ({ organizationId }: Props) => {
    // TODO: Confirm whether or not "min-h-screen" and "min-w-screen" is needed here
  return (
    <main className="flex size-full min-h-screen min-w-screen flex-col overflow-hidden rounded-xl border bg-muted">
    <WidgetAuthScreen/>
   {/* <WidgetFooter/> */}
    </main>
  )
}

export default WidgetView
