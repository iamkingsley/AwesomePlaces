import { Platform } from "react-native";
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
    Promise.all([
        Icon.getImageSource(Platform .OS === "android" ? "md-search" : "ios-search", 30, "#428bca"),
        Icon.getImageSource(Platform .OS === "android" ? "md-share-alt" : "ios-share-alt", 30, "#428bca"),
        Icon.getImageSource(Platform .OS === "android" ? "md-menu" : "ios-menu", 30, "#428bca")
    ]).then(sources => {
        Navigation.setRoot({
            root: {
                sideMenu: {
                    id: "sideMenu",
                    left: {
                        component: {
                            id: "SideDrawer",
                            name: "awesome-places.SideDrawer",
                        },
                    },
                    center: {
                        stack: {
                            children: [
                                {
                                    bottomTabs: {
                                        children: [
                                            {
                                                stack: {
                                                    children: [
                                                        {
                                                            component: {
                                                                name: "awesome-places.FindPlaceScreen",
                                                                options: {
                                                                    bottomTab: {
                                                                        text: 'Find a place',
                                                                        icon: sources[0]
                                                                    },
                                                                    topBar: {
                                                                        title: {
                                                                            text: 'Find a Place',
                                                                        },
                                                                        leftButtons: [
                                                                            {
                                                                                id: "sideMenu",
                                                                                icon: sources[2]
                                                                            }
                                                                        ]
                                                                    }
                                                                },
                                                                stack: {
                                                                    children: [
                                                                        {
                                                                            component: {
                                                                                id: "awesome-places.PlaceDetailScreen",
                                                                                name: "awesome-places.PlaceDetailScreen",
                                                                                options: {
                                                                                    // bottomTab: {
                                                                                    //     text: 'Place Name',
                                                                                    //     icon: sources[0]
                                                                                    // },
                                                                                    topBar: {
                                                                                        title: {
                                                                                            text: 'Place Name',
                                                                                        },
                                                                                    }
                                                                                }
                                                                            }
                                                                        },
                                                                    ]
                                                                }
                                                            }
                                                        },
                                            
                                                    ]
                                                }
                                            },
                                            {
                                                stack: {
                                                    children: [
                                                        {
                                                            component: {
                                                                name: "awesome-places.SharePlaceScreen",
                                                                options: {
                                                                    bottomTab: {
                                                                        text: 'Share a place',
                                                                        icon: sources[1]
                                                                    },
                                                                    topBar: {
                                                                        title: {
                                                                            text: 'Share a Place',
                                                                        },
                                                                        leftButtons: [
                                                                            {
                                                                                id: "sideMenu",
                                                                                icon: sources[2]
                                                                            }
                                                                        ]
                                                                    }
                                                                }
                                                            },
                                                        }
                                                    ]
                                                }
                                    
                                            },
                                        ],
                                        options: {
                                            topBar: {
                                                visible: false
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
                            
            }
        });

    });
};

export default startTabs;