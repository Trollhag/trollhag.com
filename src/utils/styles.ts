
type StylezAttrs = {
  [attr: string]: {
    [value: string]: string | string[]
  }
}
type StylezSetup<Attr extends StylezAttrs> = {
  base?: string | string[]
  attributes: Attr
  defaults?: Partial<StylezProps<Attr>>
}

type StylezProps<Attrs extends StylezAttrs> = {
  [attr in keyof Attrs]: keyof Attrs[attr]
}

function stylez<Attrs extends StylezAttrs>(setup: StylezSetup<Attrs>) {
  return (_props: Partial<StylezProps<StylezSetup<Attrs>['attributes']>> = {}) => {
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
}

export default {
  button: stylez({
    base: 'button hover:-translate-y-1 hover:shadow-md',
    attributes: {
      palette: {
        primary: 'inline-block border-2 border-emerald-600 text-emerald-600 hover:text-neutral-50 hover:bg-emerald-600 transition-all duration-500',
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
    base: 'link inline-block underline transition-all duration-500 underline-offset-4 hover:underline-offset-[6px] hover:-translate-y-1',
    attributes: {
      palette: {
        unset: '',
        primary: 'decoration-green-600'
      },
    },
    defaults: {
      palette: 'primary',
    },
  })
}
