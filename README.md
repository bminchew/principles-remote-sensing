# Physical Principles of Remote Sensing

Course materials for **Ge 158 — Physical Principles of Remote Sensing** (Fall 2026), taught by Brent Minchew.

The course introduces the physics of remote sensing, with applications to Earth, the Moon, other planets and solar system bodies, and emerging industrial uses. Topics include the fundamental properties of electromagnetic (EM) waves; EM scattering from real and idealized materials, including rough surfaces and vegetation; the interaction of EM radiation with the atmosphere; thermal and microwave emission; and the principles of optical, thermal, radar, and lidar remote sensing. See the [syllabus](syllabus/ppors_syllabus_fall2026.pdf) for logistics, grading, and recommended texts.

## Contents

| Path | What's there |
|---|---|
| [`syllabus/`](syllabus/) | Course syllabus (PDF and Word) |
| [`lectures/latex_notes/`](lectures/latex_notes/) | Typeset lecture notes, one folder per lecture (`lectureNN/notes_lectureNN.tex` and `.pdf`) |
| [`lectures/latex_notes/variables_master.pdf`](lectures/latex_notes/variables_master.pdf) | Master table of symbols and notation used throughout the notes |
| [`lectures/notes_handwritten/`](lectures/notes_handwritten/) | Scans of the original handwritten lecture notes |
| [`lectures/princRS_lecture*.pdf`](lectures/) | Lecture slides |
| [`lectures/figures/`](lectures/figures/) | Python script and figures for the Kirchhoff-approximation plots |
| [`notes/em_waves/`](notes/em_waves/) | Supplementary notes, *Electromagnetic wave propagation and interaction with matter* |

## Lecture notes

| Lecture | Topic | Notes |
|---|---|---|
| 1 | Material properties | [PDF](lectures/latex_notes/lecture01/notes_lecture01.pdf) |
| 2 | Maxwell's equations and EM wave propagation | [PDF](lectures/latex_notes/lecture02/notes_lecture02.pdf) |
| 3 | *(no written notes)* | — |
| 4 | EM wave transmission and reflection at planar interfaces, Part 1: normal incidence | [PDF](lectures/latex_notes/lecture04/notes_lecture04.pdf) |
| 5 | Reflection and transmission of EM waves at oblique incidence | [PDF](lectures/latex_notes/lecture05/notes_lecture05.pdf) |
| 6 | Reflection and transmission at oblique incidence and multiple layers | [PDF](lectures/latex_notes/lecture06/notes_lecture06.pdf) |
| 7 | Scattering from nonplanar surfaces | [PDF](lectures/latex_notes/lecture07/notes_lecture07.pdf) |
| 8 | Scattering from the ocean and other surfaces with small-scale roughness | [PDF](lectures/latex_notes/lecture08/notes_lecture08.pdf) |
| 9 | Volume scattering | [PDF](lectures/latex_notes/lecture09/notes_lecture09.pdf) |
| 10 | Interaction of EM radiation with atmospheres | [PDF](lectures/latex_notes/lecture10/notes_lecture10.pdf) |
| 11 | Atmospheric absorption and emission | [PDF](lectures/latex_notes/lecture11/notes_lecture11.pdf) |
| 12 | Atmospheric scattering and black body radiation (or why is the sky blue?) | [PDF](lectures/latex_notes/lecture12/notes_lecture12.pdf) |
| 13 | Radiometry and radiative transfer | [PDF](lectures/latex_notes/lecture13/notes_lecture13.pdf) |
| 14 | Synthetic aperture radar | [PDF](lectures/latex_notes/lecture14/notes_lecture14.pdf) |

The typeset notes follow the handwritten notes closely. Where they add to or correct the handwriting, the `.tex` source says so in a `% NOTE` comment, with the reason and the reference used. Notation is consistent across lectures; when a symbol means different things in different places, the master table records it.

## Building the notes

Each lecture compiles on its own with a standard TeX distribution (TeX Live or MacTeX):

```sh
cd lectures/latex_notes/lecture01
latexmk -pdf notes_lecture01.tex
```

The notes use common packages (`amsmath`, `tikz`, `pgfplots`, `longtable`, `ulem`, and similar). Figures are drawn in TikZ and pgfplots, so no external image files are needed.

## References

The notes draw mainly on:

- F. T. Ulaby and D. G. Long, *Microwave Radar and Radiometric Remote Sensing* (2014)
- K.-N. Liou, *An Introduction to Atmospheric Radiation* (2002)
- J. J. van Zyl, *Synthetic Aperture Radar Polarimetry* (2011)

These books are not included in the repository.
