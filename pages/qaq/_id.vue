<style lang="scss">
#question-show {
  background-color: $color-gray-light;
  margin-bottom: -40px;

  .answers {
    .answers-title {
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
      border-bottom: 1px solid $color-gray-light;
      background-color: #fff;
      box-shadow: 0 -1px 3px rgba(26, 26, 26, 0.1);

      h2 {
        font-weight: 600;
        font-size: 15px;
      }
    }
  }

  #no-content {
    margin-top: 30px;
    margin-bottom: 30px;
  }
}
</style>

<template>
  <div id="question-show">
    <v-header
      type="pure"
      margin-bottom="0"
    />
    <question-panel/>
    <v-layout>
      <div
        v-if="qaq.answer_count"
        class="answers"
      >
        <div class="answers-title">
          <h2>
            {{ qaq.answer_count }} 个回答
          </h2>
        </div>
        <answer-flow-list
          :bangumi-id="id"
        />
      </div>
      <no-content v-else>
        <el-button
          type="primary"
          round
          @click="$channel.$emit('open-write-answer-dialog')"
        >开始写第一个回答</el-button>
      </no-content>
      <template slot="aside">&nbsp;</template>
    </v-layout>
  </div>
</template>

<script>
import AnswerFlowList from '~/components/flow/list/AnswerFlowList'
import QuestionPanel from '~/components/question/QuestionPanel'

export default {
  name: 'QuestionShow',
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  async asyncData(ctx) {
    const id = ctx.route.params.id
    await Promise.all([
      ctx.store.dispatch('question/getQAQ', {
        id,
        ctx
      }),
      ctx.store.dispatch('question/getAnswers', {
        questionId: id,
        ctx
      })
    ])
  },
  head() {
    return {
      title: `${this.qaq.title} - 提问`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$utils.truncate(this.qaq.intro)
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: `calibur,提问,天下漫友是一家,${this.qaq.intro}`
        }
      ]
    }
  },
  components: {
    AnswerFlowList,
    QuestionPanel
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    qaq() {
      return this.$store.state.question.qaq
    }
  }
}
</script>
