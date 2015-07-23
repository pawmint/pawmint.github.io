---
layout: page
title: "Data analysis"
category: hands_on_our_codes
date: 2015-06-23 07:00:00
---

# Analyzing our ubismart data

## Importing data from SQL

Careful, this should be scripted!

From the ubismart server:

```
$ mkdir ~/tmp
$ sudo psql -d ubidb -U sails
> COPY event TO '/home/pawm/tmp/backup_event_<yyyy_mm_dd>.csv' DELIMITER ',' CSV HEADER;
> COPY activity TO '/home/pawm/tmp/backup_activity_<yyyy_mm_dd>.csv' DELIMITER ',' CSV HEADER;
> COPY groundtruth TO '/home/pawm/tmp/backup_groundtruth_<yyyy_mm_dd>.csv' DELIMITER ',' CSV HEADER;
# Delete old rows from the database (if the platform gets slow). You should keep 8 days of data for the viz.
> DELETE FROM event WHERE date <= '<yyyy-mm-dd>';
> DELETE FROM grountruth WHERE date <= '<yyyy-mm-dd>';
> DELETE FROM activity WHERE date <= '<yyyy-mm-dd>';
```

From your computer:

```bash
$ cd <my_data_analysis_repository>
$ scp -i ~/.ssh/pawmint_rsa pawm@normandie.ubismart.org:/home/pawm/tmp/<yyyy_mm_dd>_{activities,events,groundtruth}.csv .
```

## Loading the data into Jupyter

TODO:

* Install Jupyter
* Clone the dataviz repository
* Run the basic script
* visualize data

# Tools and methods

Typical data-mining process consists of two main steps :

* **Information Retrieval** – process of retrieving data out of data storage;
* **Knowledge Data Discovery** – processing retrieving data for discovering useful knowledge.

Data-analysis belongs to the second step and uses combination of machine learning and statistics. Some common tasks of data-analysis are following:

	* Clustering
	* Classification
	* Association rules
	* Predictive analytics
	* Analysis of deviance
	* Visualisation

 This section covers useful open-source tools and resources for the most complete data-analysis.

## Tools
* **[Ipython Notebook](http://ipython.org/notebook.html)** interactive computational environment and following packages to use with:
	* [Pandas](http://pandas.pydata.org/): Python data-analysis library;
	* [Nupmy](http://www.numpy.org/): the fundamental package for scientific computing with Python;
	* [Scipy](http://www.scipy.org/): Python-based ecosystem of open-source software for mathematics, science, and engineering;
	* [StatsModels](http://statsmodels.sourceforge.net/): module with extensive list of descriptive statistics, statistical tests, plotting functions, and result statistics; are available for different types of data and each estimato
	* [scikit-learn](http://scikit-learn.org/stable/): machine learning in Python;
	* [bokey](http://matplotlib.org/): Cool 2D plotting library; 
	* [matplotlib](http://matplotlib.org/): Not-so-cool 2D plotting library; 
	* [gnuplot](http://gnuplot-py.sourceforge.net/): Python package that interfaces to [gnuplot](http://www.gnuplot.info/), the popular open-source plotting program.
* [Octave](http://www.gnu.org/software/octave/): high-level interpreted language with extensive graphics capabilities for data visualization and manipulation. Quite similar to Matlab so that most programs are easily portable. 
* [FreeMat](http://freemat.sourceforge.net/): free environment for rapid engineering and scientific prototyping and data processing. Also similar to commercial systems such as MATLAB from Mathworks, and IDL from Research Systems.
* [NuPIC](http://numenta.org/): Numenta Platform for Intelligent Computing, a set of learning algorithms written in Python / C++ that implements [Hierarchical Temporal Memory](http://numenta.org/htm-white-paper.html). Good for real-time predictive analytics.
* [Weka](http://www.cs.waikato.ac.nz/ml/weka/): open source software written in Java with the collection of machine learning algorithms for data mining tasks. 
	* Excellent [blog](http://jmgomezhidalgo.blogspot.com.es/search/label/Data%20Mining) on some weka and data-mining (especially text-mining) tricks;
	* [Brief tutorial](http://facweb.cs.depaul.edu/mobasher/classes/ect584/weka/associate.html) on association rule mining with Weka.
* [R](http://www.r-project.org/): language and environment for statistical computing and graphics;
	* [RStudio](http://www.rstudio.com/): multi-platform user interface for R.
* Visualisation tools:
* [D3.js](http://d3js.org/): JavaScript library for manipulating documents based on data;
* [gnuplot](http://www.gnuplot.info/): portable multi-platform command-line driven graphing utility.
* [Open mHealth](http://www.openmhealth.org/): open-source code for dealing with digital health data;
* [bigMl](https://bigml.com): open-source machine learning tools for data-minig;
* [CLUTO](http://glaros.dtc.umn.edu/gkhome/cluto/cluto/overview): software for clustering low- and high-dimensional datasets and for analyzing the characteristics of the various clusters.
	
## Web resources 
* [Kaggle](https://www.kaggle.com/): The Home of Data Science. Competitions in data-mining with open-source code, tutorials and case-studies;
* [DataTau](http://www.datatau.com/): best data-mining blog;
* [KDnugetts](http://www.kdnuggets.com): Data Mining, Analytics, Big Data, and Data Science ressource with different services: courses, meetings, blogs, sofware etc;
* Topological data analysis: [blog](https://shapeofdata.wordpress.com/) and [whitepaper](http://www.ayasdi.com/resources/whitepaper/tda-and-machine-learning/);
* Short but intensive [introduction](https://www.mysliderule.com/learning-paths/data-analysis) to the field of data-analysis;
* [Data Science Masters](http://datasciencemasters.org/): open-source curriculum for learning most common methods of data-analysis;
* [Simply Statistics](http://simplystatistics.org/): blog with ideas of using statistics for solving different data-mining problems;
* [Mathematics pop-up](http://radar.oreilly.com/2013/05/signals-geometry-topology-and-data-science.html#.Ub_wVRRGuhI.twitter) in data-analysis;
* [Revolutions](http://blog.revolutionanalytics.com/statistics/): blogs about using R for big data analysis, predictive modeling and data science.
