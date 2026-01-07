"use client"
import React from 'react'
import WidgetFooter from '../components/widget-footer';
import WidgetHeader from '../components/widget-header';

interface Props{
    organizationId: string;
}

const WidgetView = ({ organizationId }: Props) => {
    // TODO: Confirm whether or not "min-h-screen" and "min-w-screen" is needed here
  return (
    <main className="flex size-full min-h-screen min-w-screen flex-col overflow-hidden rounded-xl border bg-muted">
<WidgetHeader>
    <div className="flex flex-col font-semibold justify-between gap-y-2 px-2 py-6">
        <p className='text-3xl'>Hi There! 👋</p>
        <p className='text-lg'>How can we help you today?</p>
    </div>
</WidgetHeader>
    <div className='flex flex-1'>
    Widget View for organization: {organizationId}
    </div>
   <WidgetFooter/>
    </main>
  )
}

export default WidgetView
