c.html
------
div#dataViz --> Data Visualizations


Need Customize:
---------------
Backend server C/C++ --> http://104.237.139.253:3000/
opt-frontend-common.ts --> [serverRoot] customize for your server backend c/c++ [line: 90]


visualize.html
---------------------------------------------------------------------------------------
codeInputPane --> ID variabel Code editor dengan CodeMirror atau Ace
executeBtn --> ID variabel button "Visualize Execution"


opt-frontend-common.js
---------------------------------------------------------------------------------------
isExecutingCode --> variabel global ketika code mulai di kirim ke server
var pyInputCodeMirror; // CodeMirror object that contains the input code
var pyInputAceEditor; // Ace editor object that contains the input code
var useCodeMirror = false; // true -> use CodeMirror, false -> use Ace

function startExecutingCode() --> ketika Visualize button di klik
function doneExecutingCode() --> ketika proses visualisasi code selesai
function setFronendError(lines) --> fungsi untuk menampilkan pesan/info error
function executeCodeFromScratch() --> fungsi untuk cek apa ada code atau kosong
function executeCodeAndCreateViz --> eksekusi code dan buat visualisasi
function initAceEditor(height) --> fungsi kode editor dari Ace, input kode yang akan divisualisasikan


bottle_server.py
---------------------------------------------------------------------------------------
butuh 	pg_logger.py 	>> pg_encoder.py
			>> callback_module.py
			>> ttt_module.py
			>> html_module.py
			>> htmlexample_module.py
			>> matrix.py
			>> htmlFrame.py

>> error GET --> viz_interaction.py pada file opt-frontend-common.js baris 967


pytutor.ts
---------------------------------------------------------------------------------------
export class ExecutionVisualizer --> MAIN
class DataVisualizer
class ProgramOutputBox
class CodeDisplay
class NavigationController
export function assert(cond)
export function htmlspecialchars(str)
function htmlsanitize(str)
function varnameToCssID(varname)
function isHeapRef(obj, heap)
function getRefID(obj)


visualize.ts
---------------------------------------------------------------------------------------
function SyntaxErrorSurveyBubble(parentViz, domID)
export class OptFrontendWithTestcases extends OptFrontendSharedSessions


opt-frontend.ts
---------------------------------------------------------------------------------------
export class OptFrontend extends AbstractBaseFrontend