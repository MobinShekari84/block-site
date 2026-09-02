const damasvillaConfig = {
  projectId: 'damas-villa',
  planImageUrl: 'assets/damas-villa/plan.svg',
  aspectRatio: '16 / 9',
  hotspots: [
    {
        "id": 1,
        "x": 50,
        "y": 50,
        "rot": 0,
        "title": {
            "en": "Camera 01",
            "fa": "دوربین 01"
        },
        "zone": {
            "en": "Zone",
            "fa": "فضا"
        },
        "renderUrl": "assets/damas-villa/01.webp"
    },
    {
        "id": 2,
        "x": 50,
        "y": 50,
        "rot": 0,
        "title": {
            "en": "Camera 02",
            "fa": "دوربین 02"
        },
        "zone": {
            "en": "Zone",
            "fa": "فضا"
        },
        "renderUrl": "assets/damas-villa/02.webp"
    },
    {
        "id": 3,
        "x": 50,
        "y": 50,
        "rot": 0,
        "title": {
            "en": "Camera 03",
            "fa": "دوربین 03"
        },
        "zone": {
            "en": "Zone",
            "fa": "فضا"
        },
        "renderUrl": "assets/damas-villa/03.webp"
    },
    {
        "id": 4,
        "x": 50,
        "y": 50,
        "rot": 0,
        "title": {
            "en": "Camera 04",
            "fa": "دوربین 04"
        },
        "zone": {
            "en": "Zone",
            "fa": "فضا"
        },
        "renderUrl": "assets/damas-villa/04.webp"
    }
]
};

function initSpatial() {
  if (window.InteractivePlan) {
    new window.InteractivePlan('#spatial-container', damasvillaConfig);
  } else {
    console.error("InteractivePlan class not found!");
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSpatial);
} else {
  initSpatial();
}
