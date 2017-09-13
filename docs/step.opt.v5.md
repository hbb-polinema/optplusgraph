run localhost:8003/c.html#mode=edit
====
1. $(document).ready(function()) 			-- visualize.ts
2. generateUUID() 					-- opt-frontend-common.ts
3. constructor: AbstractBaseFrontend 			-- opt-frontend-common.ts
4. supports_html5_storage()				-- opt-frontend-common.ts
	2. generateUUID()  --> why is called again?
5. clearFrontendError()					-- opt-frontend-common.ts
6. constructor: OptFrontend ext AbstractBaseFrontend	-- opt-frontend.ts
7. initAceEditor: OptFrontend				-- opt-frontend.ts
8. pyInputGetValue: OptFrontend				-- opt-frontend.ts
9. setAceMode: OptFrontend				-- opt-frontend.ts
10. 
