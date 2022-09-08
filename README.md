# n8n-nodes-switch9000

This is an n8n community node. It lets you create a switch with an infinite number of routes. 
For as long as you n8n instance allows it of course. 
It is unsure how n8n would perform with a node that has over 9000 outputs.

If you have any questions or remarks please contact me @ bram@knitco.nl


[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Compatibility

Developed and tested in version 0.193.3
The code from the switch node was borrowed in the development of this node. So probably as long as the switch node works, this one will work as well.

## Usage

When placing the node, you need to choose the mode of it. You can choose between Receiver and Sender.

![Mode](https://github.com/bramkn/n8n-nodes-switch9000/blob/master/images/mode.png)

This will determine if this node will send or receive data.
When selecting sender, it will give you the same options and act the same as a normal switch node.
* [n8n switch node docs](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.switch/)

When Receiver is chosen. You need to select the Index you want to receive for this part of the workflow. It will then filter the data and continue with the data from the Index choosen.

![Receiver](https://github.com/bramkn/n8n-nodes-switch9000/blob/master/images/receiver.png)

You can then add as many output as you want like in the image below.

![Switch9000](https://github.com/bramkn/n8n-nodes-switch9000/blob/master/images/switch9000.png)

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)

## Version history

v1: first version.
No new functionality in development at this time.


