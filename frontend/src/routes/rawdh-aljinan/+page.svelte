<script lang="ts">
    import type { Course } from '$lib/types';
    import { logout } from '$lib/../stores/auth';
    import { addToast } from '$lib/../stores/toasts';
    import { addCourse, deleteCourse, updateCourse } from '$lib/../stores/courses';
    import { onMount } from 'svelte';

    class Colors {
        static deepPink = '#ea445a';
        static deepPurple = '#5e35b1';
        static deepBlue = '#1565c0';
        static deepGreen = '#43a047';
        static deepOrange = '#f57c00';
        static deepRed = '#d32f2f';
        static deepYellow = '#fbc02d';
        static deepTeal = '#00897b';
        static deepCyan = '#00acc1';
        static deepLime = '#cddc39';
        static deepAmber = '#ffb300';
        static deepBrown = '#795548';
        static deepGrey = '#757575';
        static deepIndigo = '#3f51b5';
        static deepLightBlue = '#03a9f4';
        static deepLightGreen = '#8bc34a';

        static colorsArray = [
            Colors.deepPink,
            Colors.deepPurple,
            Colors.deepBlue,
            Colors.deepGreen,
            Colors.deepOrange,
            Colors.deepRed,
            Colors.deepYellow,
            Colors.deepTeal,
            Colors.deepCyan,
            Colors.deepLime,
            Colors.deepAmber,
            Colors.deepBrown,
            Colors.deepGrey,
            Colors.deepIndigo,
            Colors.deepLightBlue,
            Colors.deepLightGreen
        ];
    }

    let btnBackground = "#333";
    let btnColor = "#fff";

    let timeframes = [
        "6:00",
        "6:15",
        "6:30",
        "6:45",
        "7:00",
        "7:15",
        "7:30",
        "7:45",
        "8:00",
        "8:15",
        "8:30"
    ];

    let displayedTimeframes = timeframes.slice(0, timeframes.length - 1);
    
    let courses : Course[] = [
        {
            title: "عربي",
            room: "/rawdh-aljinan",
            name: "منى وابراهيم",
            teacher: "أسماء",
            color: Colors.deepPink,
            timeframe: {
                start: "6:00",
                end: "6:15"
            }
        },
        {
            title: "عربي",
            room: "/rawdh-aljinan",
            name: "ملهم",
            teacher: "أسماء",
            color: Colors.deepPink,
            timeframe: {
                start: "6:15",
                end: "6:30"
            }
        },
        {
            title: "عربي",
            room: "/rawdh-aljinan",
            name: "فاطمة ويوسف",
            teacher: "أسماء",
            color: Colors.deepPink,
            timeframe: {
                start: "6:30",
                end: "6:45"
            }
        },
        {
            title: "عربي",
            room: "/rawdh-aljinan",
            name: "مها قتادة",
            teacher: "أسماء",
            color: Colors.deepPink,
            timeframe: {
                start: "6:45",
                end: "7:00"
            }
        },
        {
            title: "عربي",
            room: "/rawdh-aljinan",
            name: "نور الهدى",
            teacher: "أسماء",
            color: Colors.deepPink,
            timeframe: {
                start: "7:15",
                end: "7:30"
            }
        },
        {
            title: "عربي",
            room: "/rawdh-aljinan",
            name: "آية سند",
            teacher: "أسماء",
            color: Colors.deepPink,
            timeframe: {
                start: "7:30",
                end: "7:45"
            }
        },
        {
            title: "عربي",
            room: "/rawdh-aljinan",
            name: "فرح وريم",
            teacher: "مبروكة",
            color: Colors.deepCyan,
            timeframe: {
                start: "7:30",
                end: "7:45"
            }
        },
        {
            title: "عربي",
            room: "/rawdh-aljinan",
            name: "مرام وجميل",
            teacher: "أسماء",
            color: Colors.deepPink,
            timeframe: {
                start: "7:45",
                end: "8:00"
            }
        },
        {
            title: "عربي",
            room: "/rawdh-aljinan",
            name: "سيما",
            teacher: "مبروكة",
            color: Colors.deepCyan,
            timeframe: {
                start: "7:45",
                end: "8:00"
            }
        },
        {
            title: "عربي",
            room: "/rawdh-aljinan",
            name: "مارية وإلياس",
            teacher: "أسماء",
            color: Colors.deepPink,
            timeframe: {
                start: "8:15",
                end: "8:30"
            }
        },
        {
            title: "القرآن",
            room: "/rawdh-aljinan",
            name: "فاطمة ويوسف ومها قتادة",
            teacher: "هدى",
            color: Colors.deepIndigo,
            timeframe: {
                start: "6:00",
                end: "6:30"
            }
        },
        {
            title: "التربية الإسلامية",
            room: "/rawdh-aljinan",
            name: "فاطمة ويوسف ومها قتادة",
            teacher: "أسماء بخضر",
            color: Colors.deepGreen,
            timeframe: {
                start: "6:00",
                end: "6:30"
            }
        },
        {
            title: "التربية الإسلامية",
            room: "/rawdh-aljinan",
            name: "منى وابراهيم وملهم",
            teacher: "أسماء بخضر",
            color: Colors.deepGreen,
            timeframe: {
                start: "6:30",
                end: "7:00"
            }
        },
        {
            title: "التربية الإسلامية",
            room: "/rawdh-aljinan",
            name: "منى وابراهيم وملهم",
            teacher: "مها",
            color: Colors.deepTeal,
            timeframe: {
                start: "6:30",
                end: "7:00"
            }
        },
        {
            title: "التربية الإسلامية",
            room: "/rawdh-aljinan",
            name: "فرح وريم وآية سند",
            teacher: "أسماء بخضر",
            color: Colors.deepGreen,
            timeframe: {
                start: "7:00",
                end: "7:30"
            }
        },
        {
            title: "القرآن",
            room: "/rawdh-aljinan",
            name: "فرح وريم وآية سند",
            teacher: "هدى",
            color: Colors.deepIndigo,
            timeframe: {
                start: "7:00",
                end: "7:30"
            }
        },
        {
            title: "القرآن",
            room: "/rawdh-aljinan",
            name: "مارية وإلياس ونور الهدى",
            teacher: "هدى",
            color: Colors.deepIndigo,
            timeframe: {
                start: "7:30",
                end: "8:00"
            }
        },
        {
            title: "التربية الإسلامة",
            room: "/rawdh-aljinan",
            name: "مارية وإلياس ونور الهدى",
            teacher: "أسماء بخضر",
            color: Colors.deepGreen,
            timeframe: {
                start: "7:30",
                end: "8:00"
            }
        },
        {
            title: "التربية الإسلامة",
            room: "/rawdh-aljinan",
            name: "مرام وجميل وسيما",
            teacher: "أسماء بخضر",
            color: Colors.deepGreen,
            timeframe: {
                start: "8:00",
                end: "8:30"
            }
        },
        {
            title: "قرآن",
            room: "/rawdh-aljinan",
            name: "مرام وجميل وسيما",
            teacher: "هدى",
            color: Colors.deepIndigo,
            timeframe: {
                start: "8:00",
                end: "8:30"
            }
        }
    ];

    onMount(() => {
        courses.forEach(course => {
            addCourse(course);
        })
    });

    courses = courses.map(course => {
        let start = timeframes.indexOf(course.timeframe.start as string) + 1;
        let end = timeframes.indexOf(course.timeframe.end as string) + 1;

        return {
            ...course,
            timeframeIndex: {
                start,
                end
            }
        };
    });

    async function handleLogout() {
        await logout();
        localStorage.clear();
        addToast({
            message: "Logout successful",
            type: "success",
            dismissible: true,
            timeout: 3000
        });

        window.location.reload();
    }

    function handleAddCourse() {
        
    }
</script>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&family=Victor+Mono:ital,wght@0,100..700;1,100..700&display=swap');
    i {
        font-size: 1.5rem;
        color: white;
    }

    .logout-container {
        display: flex;
        justify-content: space-between;
        align-items: end;
        width: 100%;
        padding: 1rem;
        .btn-logout {
            font-size: 1rem;
            color: #333;
            text-align: center;
    
            margin: 1rem 0;
            background-color: #333;
            color: #fff;
            padding: 0.5rem 2rem;
            border-radius: 0.5rem;
    
            border: 0;
            cursor: pointer;
            transition: all 0.3s;
            text-decoration: none;
    
            &:hover {
                filter: brightness(0.8);
            }
        }
    }
    main {
        * {
            font-family: 'Tajawal', sans-serif;
            font-weight: 500;
        }

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 2rem;
        background-color: #f5f5f5;
        min-width: max-content;

        position: relative;

        h1 {
            font-size: 3rem;
            color: #333;
            text-align: center;
        }

        .table {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;

            button {
                font-size: 2rem;
                color: #333;
                text-align: center;

                margin: 1rem 0;
                background-color: #333;
                color: #fff;
                padding: 0.5rem 2rem;
                border-radius: 0.5rem;

                border: 0;
                cursor: pointer;
                transition: all 0.3s;
                text-decoration: none;

                &:hover {
                    filter: brightness(0.8);
                }
            }
        }

        .grid {
            display: grid;

            width: 100%;
            max-width: 1200px;
            grid-template-columns: 1fr auto;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 0.5rem;
            background-color: #fff;
            padding: 1rem;
            margin: 0;
        }

        .rows {
            display: grid;
            grid-template-columns: auto;
            gap: 0;
            width: 100%;

            min-width: fit-content;

            .time-frame {
                color: #333;
                text-align: center;
                padding: 1rem;
                margin: 0;
                min-height: 4rem;
                display: flex;
                justify-content: center;
                align-items: start;
                font-size: 1rem;
                font-weight: 500;

                border-top: #00000023 2px solid;

                @media screen and (max-width: 768px) {
                    font-size: 1rem;
                }

                &:first-child {
                    border-top-left-radius: 0.5rem;
                    border-top-right-radius: 0.5rem;
                }

                &:last-child {
                    border-bottom-left-radius: 0.5rem;
                    border-bottom-right-radius: 0.5rem;
                }

                &:nth-child(even) {
                    background-color: #00000023;
                }

                &:nth-child(odd) {
                    background-color: #000000bb;
                    color: #fff;
                }
            }

            .card {
                background-color: #222222;
                color: #fff;
                padding: 1rem;
                border-radius: 0.5rem;
                margin: 0.5em;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                .btn-meeting {
                    padding: 0.5rem 1rem;
                    border-radius: 0.5rem;
                    margin: 0.5rem;
                    text-decoration: none;
                    font-size: 1rem;
                    font-weight: 500;
                    transition: all 0.3s;

                    background-color: var(--btn-background, #333);
                    color: var(--btn-color, #fff);

                    &:hover {
                        filter: brightness(0.8);
                        color: #fff;
                    }
                }

                h4 {
                    font-size: 1rem;
                    color: #fff;
                    margin: 0;

                    margin: 0.6rem 0;

                    display: flex;
                    flex-direction: column-reverse;
                    justify-content: center;
                    align-items: center;

                    width: 100%;

                    gap: 0.5rem;

                    .card-title {
                        color: #cecece;

                        font-size: 1rem;
                        font-weight: 500;
                        min-width: max-content;
                        user-select: none;

                        width: 100%;
                        text-align: right;
                    }

                    &:first-child {
                        font-size: 1.5rem;
                        font-weight: 700;
                    }

                    @media screen and (max-width: 768px) {
                        font-size: 0.8rem;

                        &:first-child {
                            font-size: 1.2rem;
                        }
                    }
                }
            }
        }
    }
    
</style>

<main>
    <div class="logout-container">
        <button 
            on:click={handleLogout}
            class="btn-logout"
        >
            تسجيل الخروج
        </button>
        <button
            on:click={handleAddCourse}
            class="btn-logout"
        >
        <i class="far fa-bars text-white"></i>
    </button>
    </div>
    <h1>جدول روض الجنان</h1>
    <div class="table">
        <button>الجمعة</button>
        <div class="grid">
            <div class="rows" style="grid-template-rows: repeat({timeframes.length - 1}, 1fr);">
                {#each courses as course}
                    <div class="card" style="background-color: {course.color}; grid-row: {course.timeframeIndex?.start} / {course.timeframeIndex?.end};">
                        <h4><span>{course.title}</span> <span class="card-title">: المادة</span></h4>
                        <h4><span>{course.name}</span> <span class="card-title">: الطالب\ة</span></h4>
                        <h4><span>{course.teacher}</span> <span class="card-title">: المعلم\ة</span></h4>
                        <h4><span>{course.timeframe.start} - {course.timeframe.end}</span> <span class="card-title">: الفترة</span></h4>
                        <a href={course.room} class="btn-meeting" style="--btn-background: {btnBackground}; --btn-color: {btnColor};">الاجتماع</a>
                    </div>
                {/each}
            </div>
            <div class="rows">
                {#each displayedTimeframes as timeframe}
                    <p class="time-frame">
                        {timeframe}
                    </p>
                {/each}
            </div>
        </div>
    </div>
</main>