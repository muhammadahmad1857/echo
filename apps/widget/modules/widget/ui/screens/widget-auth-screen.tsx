import React from 'react'
import WidgetHeader from '../components/widget-header'
import {
Form,
FormControl,
FormField,
FormItem,
FormLabel,
FormMessage,
} from "@workspace/ui/components/form"
import { Button } from '@workspace/ui/components/button'
import { Input } from '@workspace/ui/components/input'
import {useForm,ControllerRenderProps, FieldValues} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import { api } from "@workspace/backend/_generated/api"
import { useMutation} from "convex/react"
import { platform } from 'os'
import { Doc } from '@workspace/backend/_generated/dataModel'

const WidgetAuthScreen = () => {

    const WidgetAuthSchema = z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
    })

    const form = useForm<z.infer<typeof WidgetAuthSchema>>({
        resolver: zodResolver(WidgetAuthSchema),
        defaultValues: {
            name: "",
            email: "",
        },
    })
    
        const createContactSession = useMutation(api.public.contactSessions.createContactSession )
        // TODO: Replace with actual organization ID when add state management
        const organizationId = "123"; 

    const onSubmit = async (data: z.infer<typeof WidgetAuthSchema>) => {
        if(!organizationId) return
        
        const metadata:Doc<"ContactSession">["metadata"] = {
            userAgent:navigator.userAgent,
            language:navigator.language,
            languages:navigator.languages?.join(","),
            platform:navigator.platform,
            vendor:navigator.vendor,
            screenResolution:`${window.screen.width}x${window.screen.height}`,
            viewportSize:`${window.innerWidth}x${window.innerHeight}`,
            timezone:Intl.DateTimeFormat().resolvedOptions().timeZone,
            timezoneOffset:new Date().getTimezoneOffset(),
            cookieEnabled:navigator.cookieEnabled,
            referrer:document.referrer || "direct",
            currentUrl:window.location.href
        }

        const contactSessionId = await createContactSession({
            name: data.name,
            email: data.email,
            organizationId,
            metadata
        })

        console.log("Contact Session ID:", contactSessionId);    
    }
  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col font-semibold justify-between gap-y-2 px-2 py-6">
            <p className='text-3xl'>Hi There! 👋</p>
            <p className='text-lg'>Let&apos;s get you started</p>
        </div>
      </WidgetHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-4 px-4 py-6">
            <FormField
                control={form.control}
                name="name"
                render={({ field }:{ field: ControllerRenderProps<FieldValues, string> }) => (
                <FormItem>
                    <FormLabel className="font-semibold">Name</FormLabel>
                    <FormControl>
                        <Input 
                        className='h-10 bg-background' 
                        placeholder="John Doe" 
                        type="text" 
                        {...field} 
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
            <FormField
                control={form.control}
                name="email"
                render={({ field }:{ field: ControllerRenderProps<FieldValues, string> }) => (
                <FormItem>
                    <FormLabel className="font-semibold">Email</FormLabel>
                    <FormControl>
                        <Input className='h-10 bg-background' placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
            <Button size={"lg"} disabled={form.formState.isSubmitting} type="submit">Continue</Button>
        </form>
      </Form>

    </>
  )
}

export default WidgetAuthScreen
