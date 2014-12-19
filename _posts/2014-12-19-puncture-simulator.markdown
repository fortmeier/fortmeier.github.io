---
layout: post
title:  "Framework for Image based Puncture Simulation"
date:   2015-01-01 21:07:47
categories: science
tech: C++, Cuda, OpenGL, VTK, OpenHaptics, Eclipse, Visual-Studio, SVN, git, Virtual-Reality, Haptics, Volume-Rendering, bullet, libcml, libxml2, CMake
teaserimage: "/images/FIPSI_teaser.png"
---

During my PhD studies at the [IMI](http://www.imi.uni-luebeck.de), I researched methods for direct haptic and visual volume rendering of patient image data ([project homepage](http://www.imi.uni-luebeck.de/en/content/patient-specific-virtual-reality-simulation-punctures-using-puncture-atlases)). 

Starting from a preceeding implementation, I reworked the visual rendering pipeline and replaced surface rendering by ray casting based volume rendering, introduced novel methods for computation of deformation of the image data in real-time and developed new haptic algorithms for needle insertion, palpation and ultrasound probing. 

The results were published in the following peer-reviewed publications:

__Journal articles:__

* Fortmeier D., Mastmeyer M., Schröder J., Handels H., A Virtual Reality System for PTCD Simulation using Direct Visuo-haptic Rendering of Partially Segmented Image Data, Journal of Biomedical and Health Informatics, 2014 (in press) [manuscript](/downloads/JBHI_FortmeierMastmeyer_manuscript.pdf)

* Mastmeyer A., Hecht T., Fortmeier D., Handels H.
"Ray-Casting Based Evaluation Framework for Haptic Force Feedback during Percutaneous Transhepatic Catheter Drainage Punctures", International Journal of Computer Assisted Radiology and Surgery, 9, 3, 421-431, 2014

* Fortmeier D., Mastmeyer A., Handels H. 
"Image-Based Soft Tissue Deformation Algorithms for Real-Time Simulation of Liver Puncture",
Current Medical Imaging Reviews, 9, 2, 154-165, 2013

__Conference proceedings:__

* Fortmeier D., Mastmeyer A., Handels H. "An Image-Based Multiproxy Palpation Algorithm for Patient-Specific VR-Simulation", In: Westwood J.D., et al (eds.), Medicine Meets Virtual Reality 21, MMVR 2014, Manhattan Beach, Stud Health Technol Inform, IOS Press, 196, 107-113, 2014 [PDF](http://www.imi.uni-luebeck.de/sites/default/files/Fortmeier_MMVR21.pdf)

* Schröder J., Mastmeyer A., Fortmeier D., Handels H.
"Ultraschallsimulation für das Training von Gallengangspunktionen",
In: Deserno T.M., Handels H., Meinzer H.-P., Tolxdorff T. (eds.), Bildverarbeitung für die Medizin 2014, Aachen, Informatik aktuell, Springer, Berlin Heidelberg, 222-227, 2014

* Fortmeier D., Mastmeyer A., Handels H.
"Image-Based Palpation Simulation with Soft Tissue Deformations Using ChainMail on the GPU", In: Meinzer H.-P., Deserno T.M., Handels H., Tolxdorff T. (eds.), Bildverarbeitung für die Medizin, BVM 2013, Heidelberg, Informatik aktuell, Springer Verlag, Berlin, 140-145, 2013 [PDF](http://www.imi.uni-luebeck.de/sites/default/files/bvm2013_Fortmeier.pdf)

* Fortmeier D., Mastmeyer A., Handels H.
"Optimized Image-Based Soft Tissue Deformation Algorithms for Visualization of Haptic Needle Insertion",
In: Westwood J.D., Westwood S.W., Felländer-Tsai L., Haluck R.S., Robb R.A., Senger S., Vosburgh K.G. (eds.), Medicine Meets Virtual Reality 20, MMVR 2013, San Diego USA, Stud Health Technol Inform, IOS Press,, 184, 136-140, 2013 

* Fortmeier D., Mastmeyer A., Handels H.
"GPU-Based Visualization of Deformable Volumetric Soft-Tissue for Real-Time Simulation of Haptic Needle Insertion", 
In: Tolxdorff T., Deserno T.M., Handels H., Meinzer H.-P. (eds.), Bildverarbeitung für die Medizin 2012, Informatik aktuell, Berlin, Springer, Berlin Heidelberg, 117-122, 2012

* Mastmeyer A., Fortmeier D., Handels H.
"Anisotropic Diffusion for Direct Haptic Volume Rendering in Lumbar Puncture Simulation",
In: Tolxdorff T., Deserno T.M., Handels H., Meinzer H.-P. (eds.), Bildverarbeitung in der Medizin 2012, Informatik aktuell, Berlin, Springer, Berlin Heidelberg, 286-291, 2012

* Mastmeyer A., Fortmeier D., Handels H.
"Direct Haptic Volume Rendering in Lumbar Puncture Simulation",
In: MMVR 2012, Stud Health Technol Inform, 173, IOS Press, 280-286, 2012
