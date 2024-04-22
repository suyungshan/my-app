"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Drum() {
  const [tap, setTap] = useState(false);

  const topVariants = {
    clicked: { rotate: 0, transformOrigin: "left" },
    unclicked: { rotate: 30, transformOrigin: "left" },
  };

  const bottomVariants = {
    clicked: { rotate: -20, transformOrigin: "right" },
    unclicked: { rotate: 0, transformOrigin: "right" },
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex ">
        <motion.div
          className="z-0"
          variants={topVariants}
          animate={tap ? "clicked" : "unclicked"}
        >
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="85.000000pt"
            height="41.000000pt"
            viewBox="0 0 144.000000 41.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <metadata>
              Created by potrace 1.16, written by Peter Selinger 2001-2019
            </metadata>
            <g
              transform="translate(0.000000,41.000000) scale(0.100000,-0.100000)"
              fill="#000000"
              stroke="none"
            >
              <path
                d="M1271 383 c-22 -11 -49 -40 -73 -78 l-39 -61 -487 -88 c-627 -113
-582 -103 -582 -128 0 -14 5 -18 18 -14 9 3 170 32 357 66 187 34 372 67 410
75 39 7 121 23 184 35 l113 22 32 -30 c69 -66 149 -82 184 -37 24 30 19 65
-13 95 -21 20 -22 24 -9 48 20 39 17 60 -11 87 -28 29 -39 30 -84 8z"
              />
            </g>
          </svg>
        </motion.div>
        <motion.div
          className="z-0"
          variants={bottomVariants}
          animate={tap ? "clicked" : "unclicked"}
        >
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="85.000000pt"
            height="45.000000pt"
            viewBox="0 0 149.000000 45.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <metadata>
              Created by potrace 1.16, written by Peter Selinger 2001-2019
            </metadata>
            <g
              transform="translate(0.000000,45.000000) scale(0.100000,-0.100000)"
              fill="#000000"
              stroke="none"
            >
              <path
                d="M850 295 l-515 -63 -42 39 c-49 45 -80 59 -128 59 -63 0 -86 -70 -39
-117 23 -23 24 -27 10 -42 -22 -24 -20 -74 2 -94 22 -20 68 -21 99 -4 25 14
80 80 88 108 4 13 16 19 35 19 27 0 667 75 720 85 14 2 52 7 85 11 229 25 250
29 253 47 5 23 30 25 -568 -48z"
              />
            </g>
          </svg>
        </motion.div>
      </div>
      <motion.div
        className="z-10"
        onClick={() => {
          setTap(!tap);
        }}
      >
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="120.000000pt"
          height="75.000000pt"
          viewBox="0 0 276.000000 158.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <metadata>
            Created by potrace 1.16, written by Peter Selinger 2001-2019
          </metadata>
          <g
            transform="translate(0.000000,158.000000) scale(0.100000,-0.100000)"
            fill="#000000"
            stroke="none"
          >
            <path
              d="M1675 1495 c-161 -16 -396 -50 -535 -76 -536 -102 -1003 -292 -1038
-422 -12 -43 115 -800 140 -839 23 -35 88 -63 194 -85 73 -15 135 -18 344 -17
257 1 333 7 640 54 648 99 1227 312 1255 463 8 43 -119 802 -140 833 -20 31
-60 51 -153 76 -66 18 -111 21 -327 24 -160 2 -297 -2 -380 -11z m641 -30
c202 -33 254 -90 161 -180 -179 -171 -842 -358 -1512 -426 -157 -16 -530 -17
-620 -1 -201 34 -264 87 -195 165 135 154 652 322 1265 411 248 36 336 43 590
45 152 1 248 -4 311 -14z m273 -485 c28 -162 53 -321 57 -353 l6 -58 -50 -49
c-44 -42 -228 -147 -239 -136 -2 2 -12 51 -22 110 -18 104 -18 106 1 106 16 0
19 5 14 28 -3 15 -12 70 -21 122 -22 135 -23 140 -43 140 -15 0 -21 18 -36
110 -10 61 -17 113 -15 115 2 2 49 26 104 54 55 28 120 68 145 90 25 21 46 34
47 28 2 -7 25 -145 52 -307z m-359 58 c7 -40 16 -90 20 -112 7 -33 6 -39 -11
-43 -16 -4 -19 -11 -14 -32 3 -14 12 -66 20 -116 24 -141 25 -145 44 -145 15
0 21 -18 36 -106 14 -89 15 -108 3 -115 -46 -29 -491 -159 -543 -159 -20 0
-23 8 -38 97 -15 91 -15 99 0 110 14 11 15 21 4 85 -32 197 -32 198 -52 198
-10 0 -19 3 -19 8 0 4 -9 57 -19 117 -10 61 -18 110 -18 111 1 0 61 15 132 33
137 35 390 114 415 131 25 16 28 12 40 -62z m-586 -220 c16 -104 16 -113 1
-124 -15 -11 -14 -23 7 -148 19 -114 25 -136 40 -136 19 0 21 -6 42 -128 10
-61 10 -85 2 -87 -48 -16 -429 -79 -526 -87 l-35 -3 -12 65 c-25 142 -26 150
-7 150 13 0 15 6 11 28 -3 15 -14 76 -24 136 -14 87 -21 110 -35 114 -10 2
-18 5 -18 6 0 0 -9 52 -20 115 -11 63 -18 116 -17 117 1 2 83 15 182 29 99 14
221 34 270 44 50 10 97 19 105 20 13 1 20 -23 34 -111z m-1426 40 c30 -10 100
-24 157 -30 l103 -12 16 -97 c20 -120 20 -119 1 -119 -20 0 -19 -21 5 -160 11
-63 20 -119 20 -123 0 -5 9 -6 19 -2 23 7 25 1 41 -105 6 -41 14 -88 17 -104
l5 -28 -63 7 c-141 15 -258 54 -277 93 -10 20 -26 104 -85 460 -35 209 -40
251 -27 246 8 -4 39 -16 68 -26z m817 -40 c16 -73 35 -210 30 -218 -3 -6 -12
-10 -19 -10 -10 0 -9 -22 5 -107 30 -180 28 -173 49 -173 10 0 21 -8 24 -17
10 -36 29 -183 24 -188 -10 -11 -216 -24 -370 -25 l-156 0 -6 27 c-3 16 -13
68 -21 117 -14 79 -14 90 0 100 13 10 13 25 -7 145 -18 108 -26 135 -40 139
-11 3 -20 18 -23 41 -4 20 -11 58 -16 84 -17 89 -31 82 169 85 97 1 211 6 252
11 41 5 81 9 87 10 7 0 15 -9 18 -21z"
            />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
