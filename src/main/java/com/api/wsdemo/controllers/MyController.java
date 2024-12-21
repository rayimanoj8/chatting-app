package com.api.wsdemo.controllers;

import com.api.wsdemo.models.MyMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class MyController {
    private final SimpMessagingTemplate messagingTemplate;

    public MyController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/hello")
    public void publicMessage(@Payload MyMessage message) {
        System.out.println("Received message from client: " + message);

        // Send the message to the topic corresponding to the 'receiver'
        messagingTemplate.convertAndSend("/topic/" + message.getReciever(), message);

        System.out.println("Sent message to /topic/" + message.getReciever() + ": " + message);
    }
}
