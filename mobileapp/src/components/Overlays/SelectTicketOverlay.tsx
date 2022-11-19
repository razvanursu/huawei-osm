import { URL, URLSearchParams } from 'react-native-url-polyfill';
import { Button, Chip, Icon, Input, Overlay, Text } from "@rneui/themed";
import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { WebView } from 'react-native-webview';
import Config from "../../../config";
import { useEventTicketTemplatesQuery } from "../../generated/types";
import { usePayPalLinkMutation, usePayPalSuccessMutation } from "../../services/RestEndpoints";
import TicketTemplateEntryCard from "../Tickets/TicketTemplateEntryCard";

interface SelectTicketOverlayProps {
    eventId: string
    visible: boolean
    onClose: () => void
    //onBuyTicket: (input: AcceptParticipationInviteInput) => void
}

const SelectTicketOverlay: React.FC<SelectTicketOverlayProps> = ({
    eventId,
    visible,
    onClose,
    //onBuyTicket
}) => {
    const { data: ticketTemplates, loading, error } = useEventTicketTemplatesQuery({ variables: { eventId }})
    const [ticketId, setTicketId] = React.useState("")
    const [payPalLink, setPayPalLink] = React.useState("")
    
    const webViewRef = React.useRef<WebView>(null);
    
    const [payPalLinkMutation] = usePayPalLinkMutation({
        onCompleted: (data) => {
            setPayPalLink(data.link.link)
        },
        onError: (error) => console.log(error),
    })

    const [payPalSuccessMutation] = usePayPalSuccessMutation({
        onCompleted: (data) => {
            console.log("data", data)
            setPayPalLink("")
        },
        onError: (error) => console.log(error),
    })

    return (
        <Overlay
            isVisible={visible}
            onBackdropPress={onClose}
            overlayStyle={{
                position: "absolute",
                left: 0,
                bottom: 0,
                top: 300,
                width: "100%",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
            }}
        >
            <View style={{ marginBottom: 10, flexDirection: "row", alignItems: "center" }}>
                {ticketId && <Icon name="chevron-left" onPress={() => setTicketId("")} size={40} style={{ marginRight: 5 }} />}
                <Text h2>
                    Select Ticket
                </Text>
            </View>
            {ticketId?(
                <View style={{ padding: 5 }}>
                    <View style={{ paddingVertical: 2 }}>
                        <Text h4>
                            Choose a payment method
                        </Text>
                    </View>
                    <View style={{ justifyContent: "center", paddingHorizontal: 20, paddingTop: 20 }}>
                        <Button
                            title="Pay with PayPal"
                            onPress={() => payPalLinkMutation({ variables: { ticketId, eventId }})}
                            buttonStyle={{ marginBottom: 20 }}
                        />
                        <Button
                            title="Pay with cash"
                            style={{ marginBottom: 3 }}
                        />
                    </View>    
                </View>
            )
            :(
                <ScrollView style={{ marginBottom: 10 }}>
                    {ticketTemplates && ticketTemplates.event?.ticketTemplates.map((ticketTemplate) => (
                        <TicketTemplateEntryCard
                            key={ticketTemplate.id}
                            ticketTemplate={ticketTemplate}
                            onPress={() => setTicketId(ticketTemplate.id)}
                        />
                    ))}
                </ScrollView>
            )}
                
            <Overlay fullScreen isVisible={Boolean(payPalLink)} onBackdropPress={() => setPayPalLink("")}>
                <WebView
                    ref={webViewRef}
                    source={{ uri: payPalLink }}
                    onShouldStartLoadWithRequest={(data) => {
                        if(data.title === "PayPal Checkout") {
                            webViewRef.current?.stopLoading()      
                            const path = data.url.replace(/^.*\/\/[^\/]+/, '')
                            payPalSuccessMutation({ variables: { url: data.url, pathBuilder: () => path }})
                            return false
                        }
                        return true
                    }}
                />
            </Overlay>
        </Overlay>
    )
}

export default SelectTicketOverlay

