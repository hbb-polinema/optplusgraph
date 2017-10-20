interface IOptTestCases {
    initTestcasesPane(): any;
    loadTestCases(list: string[]): void;
    addTestcase(initialCod: any): void;
    doneRunningTest(): void;
    getCombinedCode(id: number): any;
    appStateAugmenter(appState: any): any;
}