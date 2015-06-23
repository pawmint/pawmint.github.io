---
layout: page
title: "History of the project"
category: administrative
date: 2015-06-23 08:00:00
order: 5
---


# Context and Philosophy

## History of the project and ambitions

### AMUPADH, 2010-2012

Design of an adaptable et scalable - context aware - user interface, thanks to a services based interface in OSGi. Data analysis using micro-context and grammar based technics :
Ontologic models (Ontology is to data what grammar is to language): Notation3 (N3) and Euler inference engine.

PROJECT'S RESULTS : UbiSMART  Ubiquitous Service Management and Reasoning Architecture, catching signals and analysing the residents’ behaviour, alert nurses or give simple advices. Precision 82%.

CRITICS ON THE PROJECT: not scalable, too much maintenance, too many sensors (thus too many inaccuracies), sensors' batteries too weak.

### Quality Of Life project, 2011-2015

Use less sensors and especially less types of sensors in order to enhance the system scalability of deployment and maintenance facilities. Naturally, such a low granularity sensing imposes a transfer of complexity towards algorithmic part taking care of the context awareness. This constitutes a key novelty of our current work. This project targets a deployment of up to 500 individual homes in France by 2015 and a proof of concept has already been deployed and generated 2 months of data for 3 homes. UbiSMART became the reasoning part of QoL which treats now the sensors information and takes decisions.


### Construction of a prototype

First deployment by HANDCO: Marmitek sensors (4 motion and 1 door) in three individual houses in France for a couple of weeks. This deployment was a trial which aimed at collecting preliminary data and building the proof-of-concept. On IPAL' side, it allows to test the UbiSmart software platform and to conduct a rst statically analysis of the data.

Second  deployment of sensors by Romain: Marmitek sensors (4 motion and 1 door). Pour ça, développement d’un programme Python reliant le local hardware communicating with binary protocol and the cloud platform (get data from sensors, et transfer events to the plateforme through http). The complete code has been already developed for these sensors.



## Project financing and service implementation

The project was funded by french health insurances, which are in fact our main clients.
The health insurances have an interest in elderlies staying independent at home as long as possible, because otherwise they will need to reimburse to them the retirement house fees or the nursing fees. Therefore the health insurances invest in our project with the idea to offer it for free to their clients, hoping they can benefit from this.

Thus the main users are not hospitals or retirement houses, but individuals. 

Many start-ups are developing domotics products, but only few of them are specialized in assistive living for elderlies because its a rather opaque market (need to work with geriatricians, with elderlies). 

## Choice of Semantic Web for Data Analysis

There are many data analysis methods, which can be complementary or concurrent. Here are few famous methods :

### Machine Learning = Data Mining

The overall goal of the data mining process is to extract information from a data set and transform it into an understandable structure for further use. Start with data, such as signals (sound, images) which have features (brightness, contrast, pixels amount…). The first goal would consist in chosing the most entropic combination of features. Then finding the best classifying algorithm to spread your data groups.
In practise, it is done on WayK, R (free softwares), Matlab (very expensive).
Research in this area consists in finding good classifying algorithms.

### Deep Learning = Neural Network (real quick)

The method introduced above is a one dimension Neural Network. For example, a multiple dimensions Neural Network would be a picture on which you do data mining on every single pixel, and then combines the results.

Two types of people working in Machine and Deep Learning :
Those who design them (algorithm and networks design)
Those who use the existing tools and pick the right networks

### Semantic Web

Semantic Web appeared after Machine learning, around 2000.
It's a standardized langage for machines on the web. 

Note :
Web1 : purely informatic
Web 2 : interaction human-machine (fb etc)
Web 3 : interaction web-machine, structure of language

First step : fonctionnal imperative programming
Give rules to all variables containing values, one by one :
If a>2 and b<3 then c = 4 
This is very heavy and long to write

Second step : object oriented imperative programming
Build a class diagram with classes of variables, attributes and links. Then give rules to classes.
Better than functionnal imperative but still heavy and lont to write

Third step : declarative programming = semantic web
In declarative programming, you don't tell the machine what to do with the variables. You declare how the machine should behave in any situation, which makes it totally independent. Therefore, you define :
An inference engine (a machine)
A model of rules (language used : N3)
A data model (language used : RDF + OWL)

Note : RDF defines every word, and every word is defined based on other already defined words. So what is the initial word that gives birth to all others ? « Thing » is the only predefined word. OWL gives properties to the words and transforms them into objects with links and attributes. 

### Why Semantic Web for our project, rather than other methods?


In our case the datasets are very small, which makes it hard for us to teach the machine something based on experience.
In order to use Machine Learning, a huge amount of data is needed. In our case it would mean installing tons of sensors in appartments, which can not be considered as an affordable and deployable solution for our users. 

The goal of our project is mainly to detect accidents, that is a rare event, thus hard to teach to a machine based on experience and routine. This is why such an accident should rather be defined in a semantic way. 

Many brilliant researchers try to develop assistive living systems based on machine learning and have a hard time developping a deployable solution. Starting from the idea that the ideal system is a combination of machine learning and semantic web, our team chose to focus on the second less know and complementary method. 
