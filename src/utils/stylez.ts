
export type StylezAttrs = {
  [attr: string]: {
    [value: string]: string | string[]
  }
}
export type StylezSetup<Attr extends StylezAttrs> = {
  base?: string | string[]
  attributes: Attr
  defaults?: Partial<StylezProps<Attr>>
}

export type StylezProps<Attrs extends StylezAttrs> = {
  [attr in keyof Attrs]: keyof Attrs[attr]
}

function stylez<Attrs extends StylezAttrs>(setup: StylezSetup<Attrs>) {
  function _stylez(_props: Partial<StylezProps<StylezSetup<Attrs>['attributes']>> = {}) {
    const props = { ...setup.defaults, ..._props }
    const classes = [setup.base]
    for (const key in props) {
      if (key) {
        const value = props[key]
        const attr = setup.attributes[key]
        if (value) {
          classes.push(attr[value])
        }
      }
    }
    return classes
  }
  _stylez.attributes = setup.attributes;
  _stylez.defaults = setup.defaults;

  return _stylez
}

export default {
  stylez,
  button: stylez({
    base: 'button hover:-translate-y-1 hover:shadow-md',
    attributes: {
      palette: {
        primary: 'inline-block border-2 border-primary-600 text-primary-600 hover:text-neutral-50 hover:bg-primary-600 transition-all duration-500',
        light: 'inline-block border-2 border-neutral-50 text-neutral-50 hover:text-primary-600 hover:bg-neutral-50 transition-all duration-500',
      },
      size: {
        small: 'py-2 px-5',
        medium: 'py-3 px-8',
        large: 'py-6 px-12',
      },
      rounded: {
        unset: '',
        small: 'rounded-sm',
        medium: 'rounded',
        large: 'rounded-lg',
        full: 'rounded-full'
      }
    },
    defaults: {
      size: 'medium',
      palette: 'primary',
      rounded: 'small',
    }
  }),
  link: stylez({
    base: 'link inline-block underline underline-offset-4 hover:underline-offset-[6px] hover:-translate-y-1 transition-all duration-500',
    attributes: {
      palette: {
        unset: '',
        primary: 'decoration-primary-600'
      },
    },
    defaults: {
      palette: 'primary',
    },
  }),
  input: stylez({
    base: 'block w-full bg-transparent border-2 py-2 px-3',
    attributes: {
      palette: {
        primary: "",
        light: "border-neutral-50 text-neutral-50",
      },
      size: {
        small: 'py-2 px-5',
        medium: 'py-3 px-8',
        large: 'py-6 px-12',
      },
      rounded: {
        unset: '',
        small: 'rounded-sm',
        medium: 'rounded',
        large: 'rounded-lg',
        full: 'rounded-full'
      }
    },
    defaults: {
      size: 'medium',
      rounded: 'small',
    },
  })
}
