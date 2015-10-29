# Konversation - A facebook app.
###### This project is the result of the collaboration between Alex Lenail, Tyler Lubeck, and Todd Pollak at HackMIT, October 5-6 2013.

##### Update: Facebook built Messenger.com in early 2015. This app was messenger.com before messenger.com

## Description

You know how you have some friends on facebook which you have massive, and I mean massive chat logs with? Have you ever tried scrolling up to find something in that conversation? It's a finger-workout, and that's what Konversation seeks to fix.

The goal was for the app to be an elegant way to interact with facebook messages. We first wanted to download all a user's facebook messages onto their local machine, and then give them a portal to interact with those seamlessly. The killer app was infinite scroll upwards: every message you had ever sent was actually rendered in the dom above the most recent message. This seemed like a good idea at the time.

## Design

![alt tag](https://raw.github.com/zfrenchee/Konversation/master/images/design/1.png)

I had recently discovered a font called Lato, and was enamored with Lato at ultra-thin font-weight 100. (I still am, to be fair)

Minimalism and a great deal of whitespace seemed to fit with that font. Looking back, I'm pleased to say I think that large parts of this design actually make sense.

![alt tag](https://raw.github.com/zfrenchee/Konversation/master/images/design/2.png)

Upon logging in, a user is given a set of convesations to choose from. The original plan was for Konversation to only be for one conversation. You would select one conversation that mattered to you most, we would download the entire thing to your machine, and then you would be able to browse it however you pleased.

![alt tag](https://raw.github.com/zfrenchee/Konversation/master/images/design/3.png)

Since we got to building this last part fairly late, the actual conversation design is a little lacking (it must have been 4 or 5am).

The main issue we ran into and never fixed about this project is that facebook's api is designed against apps like this one: it doesn't make sense for them to allow any other app to download the entirety of someone's conversations. Those api calls are expensive (especially for those old parts of the conversation which are stored on hard drives somewhere in long term storage).

Nevertheless, I certainly feel vindicated for convincing Todd and Tyler to build my idea which became an exact clone of what facebook would build two years later. Not bad for a couple sophomores new to CS!


