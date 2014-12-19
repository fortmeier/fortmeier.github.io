---
layout: post
title:  "Autoneedle"
date:   2015-01-01 21:07:47
categories: science
tech: C++, VTK, CMake, Python, SymPy 
teaserimage: "/images/FIPSI_teaser.png"
---

I experimented with the SymPy library with the purpose to generate C++ code directly from differential equations.

In the course of my PhD project, I came along the problem of computation of deformations for bendable needles. I knew that formulations of the energies of deformable rods were given in [1][2] and wanted to generate C++ code without having to derive the necessary formulation by hand. Instead, I wrote Python code that did the tedious work for me.

In the end, the code could be used to generate code for the needed Jacobians but which was not fast enough to be usable in visuo-haptic simulation.

* [1] Bergou, M., Wardetzky, M., Robinson, S., Audoly, B., & Grinspun, E. (2008). Discrete Elastic Rods. ACM Transactions on Graphics, 27(3)

* [2] Spillmann, J., & Teschner, M. (2007). CORDE: Cosserat Rod Elements for the Dynamic Simulation of One-Dimensional Elastic Objects. ACM SIGGRAPH 2007 Symposium on Computer Animation, 1.
