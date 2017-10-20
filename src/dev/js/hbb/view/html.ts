export const JAVA_BLANK_TEMPLATE = `public class YourClassNameHere {
    public static void main(String[] args) {

    }
}`;

export const CPP_BLANK_TEMPLATE = `int main() {

  return 0;
}`;

export const testCasesPaneHTML = `
  <table id="testCasesTable">
    <thead>
      <tr>
        <td style="width: 310px">Tests</td>
        <td><button id="runAllTestsButton" type="button">Run All Tests</button></td>
        <td>Results</td>
        <td></td>
        <td></td>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </table>
  <a href="#" id="addNewTestCase">Add new test</a>`;

export const redSadFace = require('../../images/red-sad-face.jpg');
export const yellowHappyFace = require('../../images/yellow-happy-face.jpg');

export const eureka_survey = `
  <div id="eureka_survey" style="text-align: center; margin-top: 10px; margin-bottom: 15px;">
    <div style="margin-bottom: 6px;">Help us improve this tool by clicking below whenever you learn something:</div>
    <button class="surveyBtnBig" type="button">I just cleared up a misunderstanding!</button>
    <button class="surveyBtnBig" type="button" style="margin-left: 8px;">I just fixed a bug in my code!</button>
  </div>`;
export const eureka_prompt = "What was your misunderstanding or error? (Press 'OK' to submit)";
export const eureka_survey_version = 'v2';