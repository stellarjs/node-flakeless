{
  'targets': [{
    'target_name': 'flakeless',
    'sources': [
      'src/addon.cc',
      'src/flakeless.cc'
    ],
    'include_dirs': [
      '<!(node -e "require(\'nan\')")'
    ],
    'cflags': [
      '-std=c++11'
    ],
    'xcode_settings': {
      'OTHER_CFLAGS': [
        '-std=c++11',
        '-stdlib=libc++'
      ]
    }
  }]
}