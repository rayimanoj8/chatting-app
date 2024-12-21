package com.api.wsdemo.models;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@ToString
public class MyMessage {
    private String sender;
    private String message;
    private String reciever;
}
