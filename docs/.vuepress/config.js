module.exports = {
  title: 'IoT Devices',
  description: 'IoT Devices Course for VIVES University of Applied Sciences (Bachelor Degree)',
  themeConfig: {
    nav: [
      {text: 'GitHub', link: 'Github.com'},
    ],
    sidebar: [
      '/',
      '/00-mbed-cli/',
      '/01-hello-world/',
      // {
      //   title: 'Basic Threads',   // required
      //   path: '/02-basic-threads/',      // optional, which should be a absolute path.
      //   collapsable: false, // optional, defaults to true
      //   sidebarDepth: 1,    // optional, defaults to 1
      //   children: [
      //     '/02-basic-threads/',
      //     '/02-basic-threads/challenges/status-led/',
      //   ]
      // },
      // '/03-interrupts/',
      // {
      //   title: 'Serial Communication',   // required
      //   // path: '/05-uart/',      // optional, which should be a absolute path.
      //   collapsable: false, // optional, defaults to true
      //   sidebarDepth: 1,    // optional, defaults to 1
      //   children: [
      //     '/04-serial-communication/',
      //     '/05-uart/',
      //     // '/05-uart/challenges/your-sensor/',
      //   ]
      // },
      // {
      //   title: 'I2C',   // required
      //   path: '/06-i2c/',      // optional, which should be a absolute path.
      //   collapsable: false, // optional, defaults to true
      //   sidebarDepth: 1,    // optional, defaults to 1
      //   children: [
      //     '/06-i2c/',
      //     '/06-i2c/challenges/keypad-lock/',
      //   ]
      // },
      '/mbed-class-reference/',
      // '/01_crash_course_nodejs/',
      // '/02_bluetooth_on_rpi/',
    ],
    sidebarDepth: 1,
    repo: 'BioBoost/course_programming_from_base_to_ace',
    docsDir: 'docs',
    docsBranch: 'master'
  },
  markdown: {
    lineNumbers: true,
  },
  serviceWorker: true,
  plugins: [
    ['vuepress-plugin-zooming', {
      // selector for images that you want to be zoomable
      // default: '.content img'
      selector: 'img',

      // make images zoomable with delay after entering a page
      // default: 500
      // delay: 1000,

      // options of zooming
      // default: {}
      options: {
        bgColor: 'black',
        zIndex: 10000,
      },
    }],
    ['container', {
      type: 'codeoutput',
      defaultTitle: 'Output',
    }]
  ],
}