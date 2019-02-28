//Users mock data
let usersMock = [
    {
        login:"root", 
        pass:"root",
        tasks: [
            {title: "task1", description: "desc1", data: "2019-02-28T17:41:21.632Z", priority: "medium", pTime: "40", fTime: "30", status: "done"},
            {title: "task2", description: "desc2", data: "2019-02-28T17:41:21.632Z", priority: "low", pTime: "24", fTime: "43", status: "planning"},
            {title: "task3", description: "desc3", data: "2019-02-28T17:41:21.632Z", priority: "high", pTime: "42", fTime: "42", status: "processing"},
            {title: "task4", description: "desc4", data: "2019-02-28T17:41:21.632Z", priority: "high", pTime: "1", fTime: "0", status: "processing"},
        ]
    },

    {
        login:"qwerty", 
        pass:"12345",
        tasks: [
            {title: "task5", description: "desc5", data: "2019-02-28T17:41:21.632Z", priority: "high", pTime: "42", fTime: "42", status: "processing"},
            {title: "task6", description: "desc6", data: "2019-02-28T17:41:21.632Z", priority: "high", pTime: "1", fTime: "0", status: "processing"},
        ]
    },

]


export default usersMock