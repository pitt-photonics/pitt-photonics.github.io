---
layout: post
title: AnalogVNN - A Pytorch framework for modeling analog neural networks
sub-title: 
image: /img/AnalogVNN.png
tags: [phase-change materials, hybrid photonic computing, artificial intelligence]
comments: false
---

Vivswan's paper titled ["AnalogVNN: A Fully Modular Framework for Modeling and Optimizing Photonic Neural Networks"](https://arxiv.org/abs/2210.10048) is now available on Arxiv! 

Neural networks based on analog rather than digital hardware can be challenging to optimize since hyperparameters which work well in the digital domain (e.g., normalization type, precision, and activation function) may not be well suited for the analog domain. Thus, the numerous digital models currently available to the AI community typically do not translate well to analog hardware without manually adjusting these hyperparameters. 

To aid this digital-to-analog translation process, we've created AnalogVNN, a simulation framework built on PyTorch which can simulate the effects of optoelectronic noise, limited precision, and signal normalization present in physical neural network accelerators. We use this framework to train and optimize linear and convolutional neural networks with up to 9 layers and ~1.7 million parameters, while gaining insights into how normalization, activation function, reduced precision, and noise influence accuracy in analog photonic neural networks. By following the same layer structure design present in PyTorch, the AnalogVNN framework allows users to convert most digital neural network models to their analog counterparts with just a few lines of code, taking full advantage of the open-source optimization, deep learning, and GPU acceleration libraries available through PyTorch.

AnalogVNN is open-source and can be forked from our public [Github repository](https://github.com/Vivswan/AnalogVNN). [Click here](https://analogvnn.readthedocs.io/en/latest/) for documentation and brief tutorial on how to use it for your own analog neural networks.