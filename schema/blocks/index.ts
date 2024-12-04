import { defineType, defineArrayMember } from 'sanity'

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'content'
 *  }
 */
export default defineType({
  title: 'Blocks',
  name: 'blocks',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'card',
    }),
    defineArrayMember({
      title: 'Content',
      name: 'content',
      type: 'object',
      fields: [
        { name: 'value', type: 'content' },
      ],
      preview: {
        select: {
          title: 'value'
        }
      }
    }),
  ],
})
