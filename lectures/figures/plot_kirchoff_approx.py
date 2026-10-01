#!/usr/bin/env python3
'''
Plot normalized radar cross section for undulating surface and large RMS roughness height

From lecture 7
'''
import sys,os
import numpy as np
import matplotlib.pyplot as plt

slope = np.logspace(-4,1,10000)
thetavals = [np.pi/6.,np.pi/4.,np.pi/3.] 

fig = plt.figure()

for theta in thetavals:
    sigma0 = np.exp(-np.tan(theta)**2/(4.*slope*slope))/(4.*slope*slope*np.cos(theta)**4)
    plt.plot(slope,sigma0,label=r'$\theta_i = \pi/$%d' % np.int(np.pi/theta + 0.5))

plt.legend()
plt.xlim([0,5])
plt.ylim([0,2])
plt.xlabel('slope [-]')
plt.ylabel(r'$\sigma^0_{pp}/|\rho_p(0)|^2$ [dB]')
plt.savefig('figs/kirchhoff_vs_slope.pdf',bbox_inches='tight')

slopevals = [0.2,0.3,0.4,0.5]
theta = np.linspace(np.pi/6.,np.pi/3.,1000)

fig = plt.figure()

for slope in slopevals:
    sigma0 = np.exp(-np.tan(theta)**2/(4.*slope*slope))/(4.*slope*slope*np.cos(theta)**4)
    plt.plot(theta*180./np.pi,10.*np.log10(sigma0),label=r'$m = %1.3f$' % slope)

plt.legend()
plt.xlabel('incidence angle [degrees]')
plt.ylabel(r'$\sigma^0_{pp}/|\rho_p(0)|^2$ [dB]')
plt.savefig('figs/kirchhoff_vs_theta.pdf',bbox_inches='tight')


