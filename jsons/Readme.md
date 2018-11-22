# Jsons

The communication between the client and server is based on json. This
documents describes the format of the different jsons and examples of them can
be found in this folder.

All values are assigned `null` inside this document for simplicity, but can
only have the `null` as value if the comment states it. 

## SimpleCommand


```json
{
    "SimpleCommand": {
        /** 
          * Command to execute on the server 
          * @type String 
          */
        "name": null
    }
}
```

Send by **client**

Used for commands that don't require additional arguments. Possible commands are:

  + get_led_status
    server will response with `LedStatus`

  + ...

## LedStatus

```json
{
    "LedStatus": {
        /**
          * Led on
          * @type Boolean
          * can be null
          */
        "on": null,
        /**
          * Color led displays
          * @type Array[int8, int8, int8]
          * can be null
          */
        "color": null,
        /**
          * Brightness of led
          * @type int8
          * can be null
          */
        "brightness": null
    }
}
```

Send by **server** and **client**

Used to set(client) or return(server) the Led status.
