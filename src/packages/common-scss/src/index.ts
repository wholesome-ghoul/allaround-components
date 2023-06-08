class CommonScss {
  PATH =
    process.env.NODE_ENV === "development" ? "." : "./packages/common-scss/src";

  common() {
    import(`${this.PATH}/index.scss`).then(() => {});
    return this;
  }

  reset() {
    import(`${this.PATH}/reset.scss`).then(() => {});
    return this;
  }
}

const commonScss = new CommonScss();

export default commonScss as CommonScss;
