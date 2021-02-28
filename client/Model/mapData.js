const Images = [
    { image: require('../assets/images/im1.jpg')},
    { image: require('../assets/images/im2.jpg')},
    { image: require('../assets/images/im3.jpg')},
    { image: require('../assets/images/im4.jpg')},
    { image: require('../assets/images/netflix.jpg')},
]

export const markers = [
    {
        coordinate: {
            latitude: 36.517778,
            longitude: 127.249985
        },
        distance: '5km',
        title: '정이든 님',
        image: Images[0].image,
    },
    {  
        coordinate: {
            latitude: 36.518106,
            longitude: 127.248697
        },
        distance: '5km',
        title: '원성영 님',
        image: Images[1].image,
    },
    {
        coordinate: {
            latitude: 36.520055,
            longitude: 127.248826
        },
        distance: '5km',
        title: '이은비 님',
        image: Images[2].image,
    },
    {
        coordinate: {
            latitude: 36.516666,
            longitude: 127.246219
        },
        distance: '5km',
        title: '이우재 님',
        image: Images[3].image,
    },
    { 
        coordinate: {
            latitude: 36.519054,
            longitude: 127.251766
        },
        distance: '5km',
        title: '박현종 님',
        image: Images[4].image,
    } 
]
